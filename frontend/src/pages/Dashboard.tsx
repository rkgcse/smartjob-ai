import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://smartjob-ai.onrender.com";

interface Job {
  _id: string;
  title: string;
  company: string;
  skills?: string[];
  applyLink: string;
}

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/api/matching`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setJobs(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load jobs.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Matched Jobs</h1>

        {loading && <p className="text-gray-600">Loading jobs...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && jobs.length === 0 && (
          <p className="text-gray-600">No matching jobs found.</p>
        )}

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow p-5 border"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-700 mb-2">{job.company}</p>

              <div className="mb-3">
                <p className="font-semibold text-sm">Required Skills:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {job.skills?.length ? (
                    job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Not specified
                    </span>
                  )}
                </div>
              </div>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Apply
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;