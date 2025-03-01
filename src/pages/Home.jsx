import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch job suggestions based on input
  useEffect(() => {
    if (searchQuery.trim()) {
      axios
        .get(`http://localhost:3000/jobs?search=${searchQuery}`)
        .then((res) => {
          setSuggestions(res.data.slice(0, 5)); // Limit to 5 suggestions
        })
        .catch((err) => console.error("Error fetching job suggestions:", err));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Job Finder</h1>
      <p className="text-lg text-gray-700 mb-6">Find your dream job easily!</p>

      {/* Search Bar */}
      <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col w-96">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10">
            {suggestions.map((job) => (
              <li
                key={job._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchQuery(job.title);
                  navigate(`/jobs?search=${encodeURIComponent(job.title)}`);
                }}
              >
                {job.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-6">
        <Link to="/jobs">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600">
            Browse Jobs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
