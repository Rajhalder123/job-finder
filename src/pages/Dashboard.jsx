import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs"); // Replace with your API route
        const data = await response.json();
        setJobs(data.slice(-3)); // Get the last 3 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  }, []);
  

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Please log in to access the dashboard.
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Job Finder Dashboard</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>
          <li className="cursor-pointer hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/jobs")}>
            Job Listings
          </li>
          <li className="cursor-pointer hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/applications")}>
            Applications
          </li>
          <li className="cursor-pointer hover:bg-blue-700 p-2 rounded" onClick={() => navigate("/profile")}>
            Profile
          </li>
        </ul>
        <button onClick={logout} className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-bold">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Welcome, {user.username}!</h2>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Jobs Posted</h3>
            <p className="text-3xl font-bold">{jobs.length}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-600">Applications</h3>
            <p className="text-3xl font-bold">156</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-bold text-purple-600">Users</h3>
            <p className="text-3xl font-bold">387</p>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Recent Job Listings</h3>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-blue-600">{job.title}</h4>
                    <p className="text-gray-600">Company: {job.company}</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-lg">
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
