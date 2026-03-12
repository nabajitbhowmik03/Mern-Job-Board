import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const EmployerDashboard = () => {

  const { jobId } = useParams();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    if (jobId) {
      api.get(`/applications/job/${jobId}`)
        .then(res => setApplications(res.data))
        .catch(err => console.log(err));
    } else {
      api.get("/jobs/my-jobs")
        .then(res => setJobs(res.data))
        .catch(err => console.log(err));
    }

  }, [jobId]);


  const updateStatus = async (id, status) => {

    try {

      await api.put(`/applications/status/${id}`, { status });

      toast.success(`Candidate ${status}`);

      if (status === "Rejected") {
        setApplications(prev => prev.filter(app => app._id !== id));
      } else {
        setApplications(prev =>
          prev.map(app =>
            app._id === id ? { ...app, status } : app
          )
        );
      }

    } catch (error) {
      toast.error("Status update failed");
    }

  };


  return (
    <div className="p-6">

      {!jobId && (
        <>
          <h1 className="text-2xl font-bold mb-4">Your Jobs</h1>

          {jobs.map(job => (
            <div key={job._id} className="border w-2/4 p-4 mb-3 rounded-lg">

              <h2 className="font-bold text-lg">{job.title}</h2>
              <p className="opacity-70">{job.company}</p>

              <Link
                to={`/dashboard/${job._id}`}
                className="btn btn-sm mt-2"
              >
                View Applicants
              </Link>

            </div>
          ))}
        </>
      )}

      {jobId && (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-20">Applicants</h1>

          {applications.map(app => (
            <div
              key={app._id}
              className="border w-2/4 p-4 mb-3 rounded-lg flex justify-between items-center"
            >

              <div>
                <p className="font-semibold">Name : {app.candidate.name}</p>
                <p className="opacity-70">Mail Id : {app.candidate.email}</p>
                <p className="text-sm">Status: {app.status}</p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => updateStatus(app._id, "Reviewed")}
                  className="btn btn-success p-4"
                >
                  Review
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Selected")}
                  className="btn btn-success p-4"
                >
                  Select
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Rejected")}
                  className="btn btn-error p-4"
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </>
      )}

    </div>
  );
};

export default EmployerDashboard;