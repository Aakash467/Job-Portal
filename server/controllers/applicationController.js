import mongoose from "mongoose";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async(req,res) =>{
    try{
        const jobId = req.params.id;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID." });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }
        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            recruiter: job.postedBy
        });
        job.applications.push(newApplication._id);
        await job.save();
        await newApplication.save();
        return res.status(201).json({ message: "Application submitted successfully.", applicationId: newApplication._id });
    }
    catch(error){
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const getApplications = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const applications = await Application.find({ applicant: userId })
        .populate({
          path: 'job',
          populate: { path: 'company', select: 'name' }
        });
  
      return res.status(200).json({ applications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
};

export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID." });
        }

        const applications = await Application.find({ job: jobId })
            .populate({
                path: 'applicant',
                select: 'fullname email phoneNumber profile appliedAt',
            })
            .populate({
                path: 'job',
                select: 'title location position'
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job." });
        }

        return res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applicants for job:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const updateStatus = async(req,res) =>{
    try{
        const {status} = req.params;
        const applicationId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({ message: "Invalid Application ID." });
        }
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }
        application.status = status;
        await application.save();
        return res.status(200).json({ message: "Application status updated successfully.", application });
    }catch(err){
        console.error("Error updating application status:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
    
}

export const getRecruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const applications = await Application.find({ recruiter: recruiterId })
            .populate({
                path: 'job',
                select: 'title location'
            })
            .populate({
                path: 'applicant',
                select: 'fullname email'
            });

        return res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching recruiter applications:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};