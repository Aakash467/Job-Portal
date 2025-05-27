import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Chip,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import {
  Work,
  LocationOn,
  AttachMoney,
  Schedule,
  People,
  PostAdd
} from '@mui/icons-material';
import API_URL from '../utils/api';

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/jobs/getadminjobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          My Posted Jobs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your job postings and view applicants
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Work sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Jobs Posted Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Get started by posting your first job opportunity
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/post-job"
            startIcon={<PostAdd />}
          >
            Post New Job
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {jobs.map(job => (
            <Grid item xs={12} key={job._id}>
              <Paper
                component={Link}
                to={`/applicants/${job._id}`}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[3],
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {job.position}
                    </Typography>
                  </Box>
                  <Chip
                    label={job.jobType}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    {job.salaryRange && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney fontSize="small" color="action" />
                        <Typography variant="body2">{job.salaryRange}</Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<People />}
                      sx={{ mt: 1 }}
                    >
                      View Applicants
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
