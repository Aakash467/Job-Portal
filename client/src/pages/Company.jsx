import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import API_URL from '../utils/api';

export default function Company() {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    location: '',
    website: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/companies/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Company registered successfully!');
      setFormData({ companyName: '', description: '', location: '', website: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to register company.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 6,
        boxShadow: 3,
        borderRadius: 4,
        bgcolor: 'background.paper'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 5,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: 50,
              height: 4,
              bgcolor: 'primary.main',
              mx: 'auto',
              mt: 2,
              borderRadius: 2
            }
          }}
        >
          Register Your Company
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4 
          }}
        >
          <TextField
            variant="outlined"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            fullWidth
            sx={{ fieldset: { borderRadius: 2 } }}
            placeholder="Enter your company's legal name"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            variant="outlined"
            sx={{ fieldset: { borderRadius: 2 } }}
            placeholder="Brief description about your company's mission and values"
          />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                fullWidth
                sx={{ fieldset: { borderRadius: 2 } }}
                placeholder="Headquarters location"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                fullWidth
                sx={{ fieldset: { borderRadius: 2 } }}
                placeholder="https://yourcompany.com"
              />
            </Grid>
          </Grid>

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ 
              mt: 3,
              py: 2,
              width: '50%',
              mx: 'auto',
              borderRadius: 2,
              fontWeight: 700,
              letterSpacing: 1,
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: 3
              },
              transition: 'all 0.2s ease'
            }}
          >
            Register Company
          </Button>
        </Box>
      </Box>
    </Container>
  );
}