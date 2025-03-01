import React, { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Ensure this file exists

const Profile = () => {
    const { user, logout } = useContext(AuthContext); // Get user details from AuthContext

    if (!user) {
        return <h2>Please log in to view your profile.</h2>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email || "Not provided"}</p>
            <p><strong>Role:</strong> {user.role || "User"}</p>
            
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
