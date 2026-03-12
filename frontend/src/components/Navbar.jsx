import { Link } from "react-router-dom";
import { Briefcase, LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 fixed top-0 w-full z-50">

      {/* Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          JOB-BOARD
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-3">

        {!user && (
          <>
            <Link to="/login" className="btn btn-primary">Sign In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}

        {user?.role === "candidate" && (
          <Link to="/my-applications" className="btn btn-success">
            My Applications
          </Link>
        )}

        {user?.role === "employer" && (
          <>
            <Link to="/dashboard" className="btn btn-success rounded-full flex gap-2">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link to="/post-job" className="btn btn-success rounded-full flex gap-2">
              <Briefcase size={18} />
              Post a Job
            </Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="btn btn-secondary p-4">
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Menu size={26} />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md flex flex-col gap-3 p-4 md:hidden">

          {!user && (
            <>
              <Link to="/login" className="btn btn-primary">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}

          {user?.role === "candidate" && (
            <Link to="/my-applications" className="btn btn-success">
              My Applications
            </Link>
          )}

          {user?.role === "employer" && (
            <>
              <Link to="/dashboard" className="btn btn-success">Dashboard</Link>
              <Link to="/post-job" className="btn btn-success">Post a Job</Link>
            </>
          )}

          {user && (
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default Navbar;