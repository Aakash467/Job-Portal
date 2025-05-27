import express from 'express';
import { applyJob , getApplications, getJobApplicants, updateStatus, getRecruiterApplications } from '../controllers/applicationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/my-applications', authMiddleware, getApplications);
router.get('/job-applicants/:id', authMiddleware, getJobApplicants);
router.put('/update-status/:id/:status', authMiddleware, updateStatus);
router.post('/apply/:id', authMiddleware, applyJob);
router.get('/recruiter-applications', authMiddleware, getRecruiterApplications);

export default router;