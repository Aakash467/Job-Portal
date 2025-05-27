import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { Container, Box, Typography, TextField, MenuItem, Button } from '@mui/material';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryRange: '',
    position: '',
    jobType: 'Full-time',
    experience: 'Fresher',
    requirements: '',
    companyName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/jobs/post`, {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      alert('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        salaryRange: '',
        position: '',
        jobType: 'Full-time',
        experience: 'Fresher',
        requirements: '',
        companyName: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to post job');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 700, mx: 'auto', p: 4, boxShadow: 3, borderRadius: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 700, 
          mb: 4,
          color: 'text.primary',
          textAlign: 'center',
          '&:after': {
            content: '""',
            display: 'block',
            width: 40,
            height: 4,
            bgcolor: 'primary.main',
            mx: 'auto',
            mt: 2,
            borderRadius: 2
          }
        }}>
          Post New Job
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            variant="outlined"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            fullWidth
            sx={{ fieldset: { borderRadius: 2 } }}
          />

          <TextField
            variant="outlined"
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
            sx={{ fieldset: { borderRadius: 2 } }}
          />

          <TextField
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
            sx={{ fieldset: { borderRadius: 2 } }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              label="Salary Range"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              required
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 3 }}>
            <TextField
              select
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              {['Fresher', '1-3 years', '3-5 years', '5+ years'].map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <TextField
            label="Requirements (comma-separated)"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, Communication Skills"
            sx={{ fieldset: { borderRadius: 2 } }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ 
              mt: 2,
              py: 2,
              borderRadius: 2,
              fontWeight: 700,
              letterSpacing: 1,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            Publish Job Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
}