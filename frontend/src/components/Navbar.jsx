import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home or login
  };

  return (
    <nav className="bg-blue-600 w-full p-4 fixed top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to='/'>EduBook</Link>
        </div>
        <div className="space-x-10">
          <Link to="/events" className="text-white hover:text-gray-200">Events Catalog</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/eventlogin" className="text-white hover:text-gray-200">Event Promotion</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="text-white hover:text-gray-200">Sign Up</Link>
              <Link to="/login" className="text-white hover:text-gray-200">Log In</Link>
            </>
          ) : (
            <button 
              onClick={handleSignOut}
              className="text-white hover:text-gray-200"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
