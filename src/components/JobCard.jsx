import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">{job.title}</h3>
      <p className="text-gray-600 font-medium">{job.company} - <span className="text-gray-800">{job.location}</span></p>
      
      <p className="text-lg text-green-600 font-semibold mt-2">💰 Salary: <span className="text-green-800">{job.salary}</span></p>

      <div className="mt-4">
        <Link
          to={`/jobs/${job._id}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-md"
        >
          🔍 View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
