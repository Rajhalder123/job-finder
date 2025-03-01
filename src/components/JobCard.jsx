import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-500">View Details</Link>
        </div>
    );
};

export default JobCard;
