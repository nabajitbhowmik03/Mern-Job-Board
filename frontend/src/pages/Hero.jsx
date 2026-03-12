import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSearch = () => {

    if (!user) {
      toast.error("Please Sign In / Sign Up first");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-6">

      <h1 className="text-5xl font-bold mb-6">
        4000+ Jobs Available Here
      </h1>

      <p className="max-w-xl opacity-70 mb-8">
        Discover thousands of job opportunities from top companies.
      </p>

      <button
        onClick={handleSearch}
        className="btn btn-primary rounded-full px-8"
      >
        Search Jobs
      </button>

    </div>
  );
};

export default Hero;