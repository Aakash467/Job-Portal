import express from "express";
import { postJob , getAllJobs, getJobById, getAdminJobs } from "../controllers/jobController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/post", authMiddleware,postJob );
router.get("/getalljobs/",getAllJobs);
router.get("/getjob/:id",getJobById);
router.get("/getadminjobs", authMiddleware, getAdminJobs);

export default router;