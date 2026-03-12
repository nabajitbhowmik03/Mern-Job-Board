import { useNavigate } from "react-router-dom";
import { Pencil, Trash, ArrowLeft, MapPinIcon } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      toast.success("Job deleted");

      window.location.reload();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6 hover:shadow-xl transition flex flex-col justify-between h-full">

      {/* Top Section */}
      <div>

        <h1 className="text-xl font-semibold">
          {job.title}
        </h1>

        <h2 className="text-sm opacity-70">
          Company Name : {job.company}
        </h2>

        <h1 className="text-sm opacity-60">
          <MapPinIcon size={16} className="inline mr-1"/>  {job.location}
        </h1>

      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">

        {/* Candidate actions */}
        {user?.role === "candidate" && (
          <div className="flex gap-36">

            <button
              onClick={() => navigate(`/job/${job._id}`)}
              className="btn btn-outline"
            >
              <ArrowLeft size={18}/>See Details
            </button>

            <button
              onClick={() => navigate(`/job/${job._id}`)}
              className="btn btn-primary p-4"
            >
              Apply
            </button>

          </div>
        )}

        {/* Employer icons */}
        {user?.role === "employer" && (
          <div className="flex gap-4 ml-auto">

            <Pencil
              size={18}
              className="cursor-pointer hover:text-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job/${job._id}?edit=true`);
              }}
            />

            <Trash
              size={18}
              className="cursor-pointer hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                deleteJob(job._id);
              }}
            />

          </div>
        )}

      </div>

    </div>
  );
};

export default JobCard;