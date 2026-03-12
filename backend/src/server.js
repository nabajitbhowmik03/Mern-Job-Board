import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Database Connection
connectDB();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Job Board API Running");
});


// Port
const PORT = process.env.PORT || 5000;


// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});