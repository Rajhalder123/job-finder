import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/JobCard";

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then((res) => {
                let filteredJobs = res.data;

                if (searchQuery) {
                    filteredJobs = filteredJobs.filter(job =>
                        job.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                setJobs(filteredJobs);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err);
                setLoading(false);
            });
    }, [searchQuery]);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>

            {loading && <p>Loading jobs...</p>}

            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            ) : (
                !loading && <p>No jobs found.</p>
            )}
        </div>
    );
};

export default Job;
