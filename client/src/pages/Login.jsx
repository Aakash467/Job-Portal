import React, { useState, useContext, useEffect  } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Paper,
  Link
} from '@mui/material';
import { LockOpen, Person, Email } from '@mui/icons-material';
import API_URL from '../utils/api.js';
import AuthContext from '../../context/AuthContext.jsx';

export default function Login() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'Student',
  });
  const [message, setMessage] = useState('');
  const {user ,login} = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ 
        p: 4,
        borderRadius: 4,
        border: '1px solid #e0e0e0',
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
      }}>
        <Box textAlign="center" mb={4}>
          <LockOpen sx={{ 
            fontSize: 40, 
            color: 'text.secondary', 
            mb: 2,
            bgcolor: '#f8f9fa',
            p: 1.5,
            borderRadius: 3
          }} />
          <Typography variant="h5" fontWeight="500">
            Welcome Back
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
            InputProps={{
              startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
            }}
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
            InputProps={{
              startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />
            }}
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

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              mt: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none'
            }}
          >
            Log In
          </Button>

          {message && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {message}
            </Typography>
          )}

        </Box>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" fontWeight="500">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}