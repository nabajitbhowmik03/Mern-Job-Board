import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import JobCard from "../components/JobCard";
// import HeroSection from "../components/HeroSection";

const Home = () => {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">

      <h1 className="text-3xl font-bold mb-6">
        Available Jobs
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <div key={job._id}>
            <JobCard job={job} />
          </div>
        ))}

      </div>


    </div>

  );
};

export default Home;
