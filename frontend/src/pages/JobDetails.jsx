import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

const JobDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isEmployer = user?.role === "employer";
  const isCandidate = user?.role === "candidate";

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  // Apply job
  const applyJob = async () => {
    try {

      await api.post(
        `/applications/apply/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Applied successfully");

    } catch (error) {
      toast.error("Application failed");
    }
  };

  // Update job
  const updateJob = async () => {
    try {

      await api.put(
        `/jobs/update/${id}`,
        job,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Job updated");
      navigate("/home");

    } catch (error) {
      toast.error("Update failed");
    }
  };

  // Delete job
  const deleteJob = async () => {

    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Job deleted");

      navigate("/");

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Top Buttons */}
      {/* <div className="flex justify-between mb-6">

        <button
          onClick={() => navigate("/home")}
          className="btn btn-ghost btn-sm flex gap-2"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {isEmployer && (
          <button
            onClick={deleteJob}
            className="btn btn-error btn-sm p-4"
          >
            Delete Job
          </button>
        )}

      </div> */}

      <div className="mt-20">
        <div className="flex justify-between mb-6">

          <button
            onClick={() => navigate("/home")}
            className="btn btn-ghost btn-sm flex gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          {isEmployer && (
            <button
              onClick={deleteJob}
              className="btn btn-error btn-sm p-4"
            >
              Delete Job
            </button>
          )}

        </div>
      </div>

      {/* Card */}
      <div className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6">

        {/* Title */}
        <div>
          <label className="font-semibold">Job Title</label>

          {isEmployer ? (
            <input
              name="title"
              value={job.title}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
            />
          ) : (
            <h1 className="text-3xl font-bold">{job.title}</h1>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="font-semibold">Company</label>

          {isEmployer ? (
            <input
              name="company"
              value={job.company}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
            />
          ) : (
            <p>{job.company}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>

          {isEmployer ? (
            <input
              name="location"
              value={job.location}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
            />
          ) : (
            <p>{job.location}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="font-semibold">Salary</label>

          {isEmployer ? (
            <input
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
            />
          ) : (
            <p>₹{job.salary}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>

          {isEmployer ? (
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mt-1"
              rows="5"
            />
          ) : (
            <p>{job.description}</p>
          )}
        </div>

        {/* Date */}
        {job.createdAt && (
          <p className="text-sm opacity-60">
            Posted on {new Date(job.createdAt).toDateString()}
          </p>
        )}

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3">

          {isCandidate && (
            <button
              onClick={applyJob}
              className="btn btn-success rounded-full p-4"
            >
              Apply Now
            </button>
          )}

          {isEmployer && (
            <button
              onClick={updateJob}
              className="btn btn-primary rounded-full p-4"
            >
              Save Changes
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default JobDetails;