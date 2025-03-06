import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="relative bg-blue-600 text-white px-8 py-5 flex justify-between items-center shadow-lg">
      {/* Logo & Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-semibold hover:text-gray-300 transition">JobFinder</Link>
        <Link to="/jobs" className="text-lg hover:text-gray-300 transition">Jobs</Link>
      </div>

      {/* Authentication Links */}
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="relative">
            {/* Profile Button */}
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex items-center space-x-2 bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <span className="text-xl">🧑</span> {/* Profile Icon Placeholder */}
              <span className="font-medium">{user.username}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 min-w-max bg-white text-black rounded-lg shadow-xl z-50 divide-y divide-gray-200">
                <Link to="/profile" className="block px-5 py-3 hover:bg-gray-100 transition">Profile</Link>
                <Link to="/dashboard" className="block px-5 py-3 hover:bg-gray-100 transition">Dashboard</Link>
                <button 
                  onClick={logout} 
                  className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-lg hover:text-gray-300 transition">Login</Link>
            <Link to="/register" className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
