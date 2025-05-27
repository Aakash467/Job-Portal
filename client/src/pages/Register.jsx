import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Paper,
  Avatar,
  Input,
  LinearProgress
} from '@mui/material';
import { CloudUpload, HowToReg } from '@mui/icons-material';
import API_URL from '../utils/api.js';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  // ... keep existing state and handlers ...
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'Student',
        bio: '',
        skills: '',
        resume: null,
        profilePicture: null,
        resumeFileName: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        if (files && files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
                resumeFileName: name === 'resume' ? files[0].name : prevData.resumeFileName
            }));
        }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('bio', formData.bio);
      data.append('skills', formData.skills);
      data.append('resume', formData.resume);
      data.append('resumeFileName', formData.resumeFileName);
      data.append('profilePicture', formData.profilePicture);

      try {
        const response = await axios.post(`${API_URL}/users/register`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage(response.data.message || 'Registered successfully');
        navigate('/login');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Registration failed');
      }
    };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={1} sx={{ 
        p: 4, 
        borderRadius: 4,
        border: '1px solid #e0e0e0'
      }}>
        <Box textAlign="center" mb={4}>
          <HowToReg sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="h5" fontWeight="500">
            Create Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            name="fullname"
            size="small"
            value={formData.fullname}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            size="small"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            size="small"
            value={formData.password}
            onChange={handleChange}
          />

          <RadioGroup row name="role" value={formData.role} onChange={handleChange} sx={{ gap: 3 }}>
            <FormControlLabel
              value="Student"
              control={<Radio size="small" color="primary" />}
              label="Student"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
            <FormControlLabel
              value="Recruiter"
              control={<Radio size="small" color="primary" />}
              label="Recruiter"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
          </RadioGroup>

          <TextField
            fullWidth
            variant="outlined"
            label="Bio"
            name="bio"
            size="small"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
            inputProps={{ maxLength: 200 }}
            helperText={`${formData.bio.length}/200 characters`}
          />

          {/* Add Skills Field */}
          <TextField
            fullWidth
            variant="outlined"
            label="Skills"
            name="skills"
            size="small"
            value={formData.skills}
            onChange={handleChange}
            placeholder="HTML, CSS, JavaScript, ..."
            helperText="Separate skills with commas"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              component="label"
              variant="outlined"
              size="small"
              startIcon={<CloudUpload />}
              sx={{
                py: 1.5,
                borderStyle: 'dashed',
                '&:hover': { borderStyle: 'dashed' }
              }}
            >
              Resume
              <Input type="file" name="resume" hidden onChange={handleFileChange} />
            </Button>

            <Button
              fullWidth
              component="label"
              variant="outlined"
              size="small"
              startIcon={<CloudUpload />}
              sx={{
                py: 1.5,
                borderStyle: 'dashed',
                '&:hover': { borderStyle: 'dashed' }
              }}
            >
              Profile Photo
              <Input type="file" name="profilePicture" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {formData.resumeFileName && (
            <Typography variant="caption" color="text.secondary">
              Selected resume: {formData.resumeFileName}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              mt: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2
            }}
          >
            Create Account
          </Button>

          {message && (
            <LinearProgress variant="determinate" value={100} sx={{ height: 2 }} />
          )}
        </Box>
      </Paper>
    </Container>
  );
}