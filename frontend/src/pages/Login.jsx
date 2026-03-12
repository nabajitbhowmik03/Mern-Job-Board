import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const Login = ({ setUser }) => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login", form);

      // save user
      localStorage.setItem("user", JSON.stringify(res.data));

      // update global state
      setUser(res.data);

      toast.success("Login successful");

      navigate("/");

    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-6"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Sign In
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered mb-4"
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-full">
          Sign In
        </button>

      </form>
    </div>
  );
};

export default Login;