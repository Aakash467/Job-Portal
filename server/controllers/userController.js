import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role, bio, skills } = req.body;
        
        // Basic validation
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Handle file uploads
        const files = req.files;
        const resumePath = files?.resume?.[0]?.path;
        const profilePicturePath = files?.profilePicture?.[0]?.path;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                bio,
                skills: skills?.split(',').map(skill => skill.trim()) || [],
                resume: resumePath || '',
                resumeFileName: files?.resume?.[0]?.originalname || '',
                profilePicture: profilePicturePath || ''
            }
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        if(role && user.role !== role){
            return res.status(403).json({message: 'Access denied for this role'});
        }  

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
} 

export const logout = (req,res) =>{
    try{
        res.clearCookie('token');
        return res.status(200).json({message: 'Logout successful'});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}

