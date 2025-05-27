import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Typography, 
  Paper, 
  Button,
  LinearProgress,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  LocationOn,
  WorkOutline,
  AttachMoney,
  Business
} from '@mui/icons-material';
import axios from 'axios';
import API_URL from '../utils/api';

export default function HomeContent() {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/jobs/getalljobs?limit=3`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/jobs/getalljobs?keywords=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
      {/* Search Bar */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Job title, keywords, or company"
          InputProps={{
            sx: {
              borderRadius: '50px',
              height: 56,
              boxShadow: 3,
              '&:hover fieldset': { borderColor: 'transparent' },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent !important',
                boxShadow: `0 8px 24px ${theme.palette.primary.light}`,
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 48,
                    height: 48,
                    mr: 0.5,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'scale(1.05)'
                    },
                  }}
                >
                  <SearchIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              pr: 0.5,
              '& fieldset': { borderColor: 'transparent' },
            },
          }}
        />
      </Box>

      {/* Loading Indicator */}
      {loading && <LinearProgress sx={{ mb: 4 }} />}

      {/* Job Listings */}
      <Box sx={{ mt: 4 }}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Paper 
              key={job._id} 
              sx={{ 
                p: 3, 
                mb: 2, 
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: 'text.primary'
                  }}>
                    {job.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Business sx={{ 
                      fontSize: 20, 
                      color: 'text.secondary' 
                    }}/>
                    <Typography variant="body1" sx={{ 
                      color: 'primary.main', 
                      fontWeight: 500 
                    }}>
                      {job.company?.name}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2, 
                    mb: 2,
                    '& > *': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }
                  }}>
                    <Box>
                      <LocationOn sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    <Box>
                      <WorkOutline sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2">{job.jobType}</Typography>
                    </Box>
                    <Box>
                      <AttachMoney sx={{ color: 'success.main' }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {job.salaryRange}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Button 
                  variant="outlined"
                  color="primary"
                  sx={{ 
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                  href={`/jobdetails/${job._id}`}
                >
                  View Details
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            mt: 8,
            p: 4,
            borderRadius: 3,
            bgcolor: 'background.paper'
          }}>
            <SearchIcon sx={{ 
              fontSize: 60, 
              color: 'text.disabled', 
              mb: 2 
            }}/>
            <Typography variant="h6" sx={{ mb: 1 }}>
              No jobs found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try different keywords or check back later
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}