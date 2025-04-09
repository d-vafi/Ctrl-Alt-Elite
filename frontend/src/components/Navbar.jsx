import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    localStorage.removeItem("type");
    navigate("/");
  };

  const isAttendee = userType?.toLowerCase() === "attendee";
  const isOrganizer = userType?.toLowerCase() === "organizer";
  const isStakeholder = userType?.toLowerCase() === "stakeholder";

  return (
    <nav className="bg-blue-600 w-full p-4 fixed top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">EduBook</Link>
        </div>
        <div className="space-x-10">
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>

          {isOrganizer && (
            <Link
              to="/eventplanning"
              className="text-white hover:text-gray-200"
            >
              Event Planning
            </Link>
          )}

          <Link to="/events" className="text-white hover:text-gray-200">
            Events Catalog
          </Link>

          {isAttendee && (
            <Link to="/networking" className="text-white hover:text-gray-200">
              Networking
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to={
                isAttendee
                  ? "/userpromotiondashboard"
                  : "/eventpromotiondashboard"
              }
              className="text-white hover:text-gray-200"
            >
              Event Promotion
            </Link>
          )}

          {isOrganizer && (
            <Link
              to="/organizer-dashboard"
              className="text-white hover:text-gray-200"
            >
              Event Analytics
            </Link>
          )}

          {userType === "organizer" && (
            <Link
              to="/organizer-dashboard"
              className="text-white hover:text-gray-200"
            >
              Organizer Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="text-white hover:text-gray-200">
                Sign Up
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200">
                Log In
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gray-200"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
