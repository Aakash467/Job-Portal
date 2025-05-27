import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import {
  Container, Typography, Box, Paper, Button, Chip,
  Avatar, Divider, CircularProgress, Grid, Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Email, Phone, Work, Check, Close,
  Description, Schedule, Person
} from '@mui/icons-material';
import AuthContext from '../../context/AuthContext';

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: jobId } = useParams();
  const { user } = React.useContext(AuthContext);

  

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/applications/job-applicants/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/applications/update-status/${id}/${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Job Applications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage candidate applications
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : applications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Work sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Applications Received Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Applications will appear here when candidates apply
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {applications.map((app) => (
            <Grid item xs={12} key={app._id}>
              <Paper sx={{
                p: 3,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': { boxShadow: 3 }
              }}>
                <Grid container spacing={2}>
                  {/* Applicant Info */}
                  <Grid item xs={12} md={8}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 56, height: 56 }}>
                        {app.applicant.fullname[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {app.applicant.fullname}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Chip
                            label={app.status}
                            size="small"
                            color={
                              app.status === 'accepted' ? 'success' :
                              app.status === 'rejected' ? 'error' : 'default'
                            }
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email fontSize="small" color="action" />
                            <Typography variant="body2">{app.applicant.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone fontSize="small" color="action" />
                            <Typography variant="body2">{app.applicant.phoneNumber || 'Not provided'}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule fontSize="small" color="action" />
                            <Typography variant="body2">
                              Applied: {new Date(app.appliedAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Work fontSize="small" color="action" />
                            <Typography variant="body2">{app.job.title}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary.main"
                        startIcon={<Description />}
                        href={app.applicant.profile.resume ? `https://job-portal-of27.onrender.com/uploads/${app.applicant.profile.resume.split('/').pop()}` : '#'}
                        target="_blank"
                        sx={{ mb: 2 }}
                        disabled={!app.applicant.profile.resume}
                      >
                        View Resume
                      </Button>

                      {app.status === 'pending' && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            startIcon={<Check />}
                            onClick={async () => {
                              try {
                                await updateStatus(app._id, 'accepted');
                              } catch (error) {
                                console.error('Error approving application:', error);
                              }
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            startIcon={<Close />}
                            onClick={() => updateStatus(app._id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </Stack>
                      )}
                    </Box>
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
