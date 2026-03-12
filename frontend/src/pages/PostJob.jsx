import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

const PostJob = () => {

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            await api.post(
                "/jobs/create",
                job,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            toast.success("Job posted successfully");

            navigate("/home");

        } catch (error) {
            toast.error("Failed to post job");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <button
                onClick={() => navigate("/")}
                className="btn btn-ghost btn-sm mb-6 flex gap-2"
            >
                <ArrowLeft size={18} />
                Back to Home
            </button>

            {/* Card */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold mb-8">
                    Post New Job
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Job Title */}
                    <div>
                        <label className="block mb-2">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Frontend Developer"
                            className="input input-bordered w-full rounded-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block mb-2">Company</label>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            className="input input-bordered w-full rounded-full"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="City / Remote"
                            className="input input-bordered w-full rounded-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block mb-2">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            className="input input-bordered w-full rounded-full"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2">Job Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Write job details here..."
                            className="textarea textarea-bordered w-full rounded-2xl"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* Button */}
                    <div className="flex justify-end">
                        <button className="btn btn-success rounded-full px-8">
                            Post Job
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default PostJob;