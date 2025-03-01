import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="dashboard">
                <h2>Access Denied</h2>
                <p>You need to log in to view this page.</p>
                <button onClick={() => navigate("/login")}>Go to Login</button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h2>Welcome, {user.username || "User"}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
