import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; 

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Please log in to view your profile.
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to login immediately after logout
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Profile</h2>
      <div className="space-y-2">
        <p className="text-lg"><strong>Username:</strong> {user.username}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email || "Not provided"}</p>
        <p className="text-lg"><strong>Role:</strong> {user.role || "User"}</p>
      </div>
      <button 
        onClick={handleLogout} 
        className="mt-4 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
