import React from 'react';
import { useState, useContext } from 'react';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Avatar, 
  IconButton, 
  Popover, 
  MenuItem, 
  Divider,
  useTheme
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  ExitToApp,
  Person,
  Home,
  Explore,
  Work
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  //const user = null; // mock for now

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handlePopoverClose();
    navigate('/');
  };

  

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ 
        justifyContent: "space-between",
        maxWidth: 1280,
        mx: 'auto',
        width: '100%',
        px: 2
      }}>
        {/* Logo */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            letterSpacing: -0.5,
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          Applyly
        </Typography>

        {/* Navigation */}

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 3,
          color: 'text.secondary'
        }}>
          {/* Navigation links based on user role */}
          {
            user && (
              <>
                {user.role === 'Student' && (
                  <>
                    <Link to={'/'}>
                      <Button 
                        color="inherit"
                        startIcon={<Home fontSize="small" />}
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Home
                      </Button>
                    </Link>
                    <Link to={'/browse'}>
                      <Button 
                        color="inherit"
                        startIcon={<Explore fontSize="small" />}
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Browse
                      </Button>
                    </Link>
                    <Link to={'/jobs'}>
                      <Button 
                        color="inherit"
                        startIcon={<Work fontSize="small" />}
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Jobs
                      </Button>
                    </Link>
                  </>
                )}

                {user.role === 'Recruiter' && (
                  <>
                    <Link to={'/'}>
                      <Button 
                        color="inherit"
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Home
                      </Button>
                    </Link>
                    <Link to={'/post-job'}>
                      <Button 
                        color="inherit"
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Post Job
                      </Button>
                    </Link>
                    <Link to={'/my-jobs'}>
                      <Button 
                        color="inherit"
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        My Jobs
                      </Button>
                    </Link>
                    <Link to={'/registerCompany'}>
                      <Button 
                        color="inherit"
                        sx={{ fontWeight: 500, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        Company
                      </Button>
                    </Link>
                  </>
                )}

                <IconButton 
                  onClick={handleAvatarClick} 
                  sx={{ 
                    p: 0.5,
                    border: `2px solid ${theme.palette.divider}`,
                    '&:hover': { borderColor: 'text.secondary' }
                  }}
                >
                  <Avatar 
                    src={user?.profile?.profilePicture ? `https://job-portal-xi-beryl.vercel.app/uploads/${user.profile.profilePicture.split('/').pop()}` : undefined}
                    sx={{ width: 32, height: 32 }}
                  >
                    {!user.profile?.profilePicture && <AccountCircle fontSize="medium" />}
                  </Avatar>
                </IconButton>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      p: 1,
                      minWidth: 200,
                      boxShadow: theme.shadows[3],
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }
                  }}
                >
                  <MenuItem onClick={handlePopoverClose} sx={{ borderRadius: 1 }}>
                    <Person sx={{ fontSize: 20, mr: 1.5, color: 'text.secondary' }} />
                    <Link to={'/profile'}>Profile</Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleLogout} sx={{ borderRadius: 1 }}>
                    <ExitToApp sx={{ fontSize: 20, mr: 1.5, color: 'text.secondary' }} />
                    Logout
                  </MenuItem>
                </Popover>
              </>
            )
          }
          {
            !user && (
              <>
                <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                  <Link to={'/login'}><Button
                      variant="text"
                      color="inherit"
                      sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                        px: 3,
                        borderRadius: 50,
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: theme.palette.action.hover
                        },
                        transition: theme.transitions.create(['all'], {
                          duration: theme.transitions.duration.short,
                        }),
                      }}
                  >
                    Login
                  </Button></Link>
                  <Link to={'/register'}><Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        px: 3,
                        borderRadius: 50,
                        boxShadow: theme.shadows[0],
                        '&:hover': {
                          boxShadow: theme.shadows[1],
                          backgroundColor: theme.palette.primary.dark
                        },
                        transition: theme.transitions.create(['all'], {
                          duration: theme.transitions.duration.short,
                        }),
                      }}
                  >
                    Sign Up
                  </Button></Link>
                </Box>
              </>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
