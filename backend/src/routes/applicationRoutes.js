import express from "express";
import {
  applyJob,
  getUserApplications,
  getApplicantsForJob,
  updateApplicationStatus
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Candidate applies to job
router.post("/apply/:jobId", protect, applyJob);

// Candidate sees their applications
router.get("/my-applications", protect, getUserApplications);

// Employer sees all applicants for a job
router.get("/job/:jobId", protect, authorizeRoles("employer"), getApplicantsForJob);

router.put("/status/:id", protect, authorizeRoles("employer"), updateApplicationStatus);

export default router;