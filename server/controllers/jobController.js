import mongoose from 'mongoose';
import Job from '../models/jobModel.js';
import Company from '../models/companyModel.js';

export const postJob = async(req,res) =>{
    try{
        const {title, description, companyName , location , salaryRange ,position, jobType,experience,  requirements} = req.body;
        
        if(!title || !description || !companyName || !location || !salaryRange || !jobType || !experience || !position){
            return res.status(400).json({ message: "All fields are required" });
        }
        const company = await Company.findOne({ name: companyName });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        const companyExists = await Company.findById(company);
        const newJob = new Job({
            title,
            description,
            company, 
            location,
            salaryRange,
            position,
            jobType,
            experience,
            requirements: Array.isArray(requirements)
                ? requirements.map(r => r.trim())
                : typeof requirements === 'string'
                    ? requirements.split(",").map(r => r.trim())
                    : [],
            postedBy: req.user.id 
        });
        const savedJob = await newJob.save();
        return res.status(201).json({ message: "Job posted successfully", job: savedJob });
    }catch(err){
        console.error("Error posting job:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllJobs = async(req,res) =>{
    try{
        const keywords = req.query.keywords || '';
        const query = {
            $or: [
                { title: { $regex: keywords, $options: 'i' } },
                { description: { $regex: keywords, $options: 'i' } },
                { location: { $regex: keywords, $options: 'i' } },
                { requirements: { $regex: keywords, $options: 'i' } },
                { jobType: { $regex: keywords, $options: 'i' } },
                { position: { $regex: keywords, $options: 'i' } },
            ]
        };
        const jobs = await Job.find(query)
        .sort({ createdAt: -1 }) 
        .limit(parseInt(req.query.limit) || 0)
        .populate('company', 'name');
        return res.status(200).json({ jobs });
    }catch(err){
        console.error("Error fetching jobs:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getJobById = async(req,res) =>{
    try{
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid job ID" });
        }
        const job = await Job.findById(jobId).populate('company', 'name').populate('postedBy', 'name email');
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ job });
    }catch(err){
        console.error("Error fetching job:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
 
export const getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.user.id;
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({ message: "Invalid admin ID" });
        }
        const jobs = await Job.find({ postedBy: adminId }).populate('company', 'name').populate('postedBy', 'name email');
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this admin" });
        }
        return res.status(200).json({ jobs });

    }catch(err){
        console.error("Error fetching admin jobs:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}