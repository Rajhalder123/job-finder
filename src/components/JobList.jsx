
import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/jobs").then((res) => setJobs(res.data));
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
};

export default JobList;
