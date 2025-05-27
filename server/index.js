import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import companyRoutes from './routes/companyRoute.js';
import jobRoutes from './routes/jobRoute.js';
import applicationRoutes from './routes/applicationRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.get('/', (req, res) => {
        return res.status(200).json({
            message: 'Welcome to the Job Portal API'
        });
    }
);

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is in use, trying a different port...`);
        app.listen(0, () => console.log(`Server running on a different port`));
      } else {
        console.error(err);
      }
    });
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));
