import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>{job.title}</Link> - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
