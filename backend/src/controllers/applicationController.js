import Application from "../models/Application.js";

// Apply for Job
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resume: req.body.resume,
      status: "Applied",
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Candidate Applications
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    }).populate("job", "title company location salary");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.jobId,
      status: { $ne: "Rejected" }
    })
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // application.status = req.body.status;
    // await application.save();
    // res.json(application);

    // if (req.body.status === "Rejected") {
    //   await application.deleteOne();
    //   return res.json({ message: "Application rejected and removed" });
    // }

    application.status = req.body.status;
    await application.save();

    res.json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};