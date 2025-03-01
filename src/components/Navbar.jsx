import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo & Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold hover:text-gray-200">JobFinder</Link>
        <Link to="/jobs" className="hover:text-gray-200">Jobs</Link>
      </div>

      {/* Authentication Links */}
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="relative">
            {/* Profile Section */}
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <span className="font-semibold">{user.name}</span>
              <img 
                src={user.profilePic || "https://via.placeholder.com/40"} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
