import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const UserApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:3000/applications?userId=${user?.id}`);
        const data = await response.json();
        console.log("Fetched applications:", data); // Debugging
        setApplications(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]); // Fallback to an empty array
      }
    };
  
    if (user) {
      fetchApplications();
    }
  }, [user]);
  

  const handleWithdraw = async (applicationId) => {
    try {
      await fetch(`http://localhost:3000/applications/${applicationId}`, { method: "DELETE" });
      setApplications(applications.filter((app) => app._id !== applicationId));
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Job Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't applied for any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 bg-gray-100 shadow rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{app.jobTitle}</h3>
                <p className="text-gray-600">{app.company}</p>
                <p className={`text-sm font-bold mt-1 ${app.status === "Accepted" ? "text-green-500" : app.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}>
                  Status: {app.status}
                </p>
              </div>
              <button
                onClick={() => handleWithdraw(app._id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg"
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserApplications;
