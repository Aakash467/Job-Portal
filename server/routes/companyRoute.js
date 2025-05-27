import express from 'express';
import { registerCompany , getAllCompanies , updateCompany, getCompanyById } from '../controllers/companyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register' , authMiddleware, registerCompany);
router.get('/get', authMiddleware, getAllCompanies);
router.get('/get/:id', authMiddleware, getCompanyById);
router.put('/update/:id', authMiddleware, updateCompany);

export default router;