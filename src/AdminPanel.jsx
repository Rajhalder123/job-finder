import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) throw new Error("Unauthorized. Please log in as admin.");

        const res = await axios.get("http://localhost:3000/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Applications Data:", res.data); // Debugging
        setApplications(res.data);
      } catch (err) {
        console.error("Fetch Error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Job Applications
      </h2>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Applicant</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Resume</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id} className="text-center">
                  <td className="border p-2">{app.jobId?.title || "N/A"}</td>
                  <td className="border p-2">{app.jobId?.company || "N/A"}</td>
                  <td className="border p-2">{app.userId?.username}</td>
                  <td className="border p-2">{app.userId?.email}</td>
                  <td className="border p-2">
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="border p-2">{app.status}</td>
                  <td className="border p-2">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No job applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApplications;
