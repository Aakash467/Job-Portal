import { 
    Box,
    Grid,
    Typography,
    Button,
    Paper,
    Stack,
    Divider,
    Avatar  // Fixed: Avatar was incorrectly imported from '@mui/icons-material'
  } from '@mui/material';
  // Fixed icon imports
  import { 
    PostAdd, 
    Business, 
    People, 
    Assignment, 
    Work, 
    LocationOn, 
    Launch 
  } from '@mui/icons-material';
  import AuthContext from '../../context/AuthContext';
  import { useEffect, useState, useContext } from 'react';
  import axios from 'axios';
  import API_URL from '../utils/api';
  
  
  export default function RecruiterHome() {
    const [jobCount, setJobCount] = useState(0);
    const [applicantCount, setApplicantCount] = useState(0);
    const [companies, setCompanies] = useState([]);
  
    useEffect(() => {
      const fetchRecruiterStatsJobs = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API_URL}/jobs/getadminjobs/`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          setJobCount(res.data.jobs?.length || 0);
        } catch (err) {
          console.error("Failed to fetch recruiter stats:", err);
        }
      };
      fetchRecruiterStatsJobs();

      const fetchRecruiterStatsApplicants = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API_URL}/applications/recruiter-applications`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          setApplicantCount(res.data.applications?.length || 0);
        } catch (err) {
          console.error("Failed to fetch recruiter stats:", err);
        }
      }
      fetchRecruiterStatsApplicants();
    }, []);

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${API_URL}/companies/get`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          setCompanies(res.data.companies || []);
        } catch (err) {
          console.error("Failed to fetch companies:", err);
        }
      };
      fetchCompanies();
    }, []);
  
    return (
        <Box 
          sx={{ 
            maxWidth: 1200, 
            mx: 'auto', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            alignItems: 'center',
            px: 3,
            pt: 6,
            pb: 4
          }}
        >
          {/* ... rest of the component remains the same ... */}
          {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Welcome Back, Recruiter!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Manage your recruitment activities
          </Typography>
        </Box>
  
        {/* Stats Cards */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Business sx={{ color: 'primary.main', fontSize: 36 }} />
                <div>
                  <Typography variant="body2" color="text.secondary">Active Jobs</Typography>
                  <Typography variant="h5" fontWeight={700}>{jobCount}</Typography>
                </div>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <People sx={{ color: 'success.main', fontSize: 36 }} />
                <div>
                  <Typography variant="body2" color="text.secondary">Applicants</Typography>
                  <Typography variant="h5" fontWeight={700}>{applicantCount}</Typography>
                </div>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
  
        <Divider sx={{ my: 4, width: '100%' }} />
  
        {/* Quick Actions */}
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<PostAdd />}
              href="/post-job"
              sx={{ py: 2 }}
            >
              Post New Job
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<Assignment />}
              href="/my-jobs"
              sx={{ py: 2 }}
            >
              Manage Jobs
            </Button>
          </Grid>
          
        </Grid>
        <Divider sx={{ my: 4, width: '100%' }} />
          {/* Companies Section - Added conditional rendering */}
          {companies.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 6, mb: 2, fontWeight: 600, textAlign: 'center' }}>
                Your Registered Companies
              </Typography>
              <Grid container spacing={3} justifyContent="center" sx={{ py: 4 }}>
                {companies.map(company => (
                  <Grid item key={company._id} xs={12} sm={6} md={4} lg={3}>
                    <Paper 
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3,
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Avatar 
                          src={company.logo}
                          sx={{ 
                            bgcolor: 'primary.light', 
                            color: 'primary.dark',
                            width: 40,
                            height: 40
                          }}
                        >
                          <Work fontSize="small" />
                        </Avatar>
                        <Typography variant="h6" fontWeight={700}>{company.name}</Typography>
                      </Box>
    
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {company.location}
                      </Typography>
    
                      <Divider sx={{ my: 1 }} />
    
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          component="a"
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          color="primary"
                          startIcon={<Launch fontSize="small" />}
                          sx={{
                            fontWeight: 500,
                            px: 2,
                            borderRadius: 2,
                            '&:hover': {
                              bgcolor: 'primary.light'
                            }
                          }}
                        >
                          Visit Website
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      );
    }