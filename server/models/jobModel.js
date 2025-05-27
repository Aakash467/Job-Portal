import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true
    },
    experience:{
        type: String,
        enum: ['Fresher', '1-3 years', '3-5 years', '5+ years'],
        required: true
    },
    requirements: {
        type: [String],
        default: []
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Job = mongoose.model("Job", jobSchema);
export default Job;