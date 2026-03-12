import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create Job (Employer)
router.post("/create", protect, authorizeRoles("employer"), createJob);

// Get all jobs
router.get("/", getAllJobs);

router.get("/my-jobs", protect, authorizeRoles("employer"), getEmployerJobs);

// Get single job
router.get("/:id", getJobById);

// Edit job

router.put("/update/:id", protect, authorizeRoles("employer"), updateJob);

// Delete job
router.delete("/:id", protect, authorizeRoles("employer"), deleteJob);

export default router;