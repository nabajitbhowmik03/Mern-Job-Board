import { useEffect, useState } from "react";
import api from "../services/api";

const MyApplications = () => {

  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    api.get("/applications/my-applications", {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(res => setApplications(res.data));

  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6 mt-20">
        My Applications
      </h1>

      {applications.map(app => (
        <div key={app._id} className="border p-4 mb-4 w-2/4">

          <h2 className="text-xl font-bold">
            {app.job?.title || "Job not available"}
          </h2>

          <p>{app.job?.company || "Company removed"}</p>

          <p>Status: {app.status}</p>

        </div>
      ))}

    </div>
  );
};

export default MyApplications;