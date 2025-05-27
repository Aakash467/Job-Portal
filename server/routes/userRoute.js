import express from 'express';
import { register, login} from '../controllers/userController.js';
//import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', uploadMiddleware, register);
router.post('/login', login);

export default router;