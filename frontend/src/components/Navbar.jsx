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
    localStorage.removeItem("type");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isAttendee = userType?.toLowerCase() === "attendee";
  const isOrganizer = userType?.toLowerCase() === "organizer";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-600 dark:text-blue-400">
          EduBook
        </Link>

        <div className="flex flex-wrap items-center gap-6 text-base font-medium">
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>

          <Link to="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Events
          </Link>

          {isOrganizer && (
            <Link to="/eventplanning" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Event Planning
            </Link>
          )}

          {isAttendee && (
            <Link to="/networking" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
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
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Promotion
            </Link>
          )}

          {isOrganizer && (
            <Link to="/organizer-dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Analytics
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Sign Up
              </Link>
              <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Log In
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:text-red-600 dark:hover:text-red-400 transition"
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
