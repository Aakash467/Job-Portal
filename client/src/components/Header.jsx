import React from 'react';
import { Box, Typography,useTheme } from '@mui/material';

export default function Header() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 8,
      px: 2,
      background: 'linear-gradient(to bottom, #f9faff 0%, #ffffff 100%)'
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        px: theme.spacing(2)
      }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2.5,
            py: 1,
            backgroundColor: 'rgba(108, 63, 199, 0.1)',
            borderRadius: '8px',
            mb: 3
          }}
        >
          <Typography variant="overline" sx={{ 
            color: 'rgb(45, 131, 243)', 
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: '0.75rem'
          }}>
            LEADING JOB PLATFORM
          </Typography>
        </Box>

        <Typography variant="h1" sx={{ 
          fontWeight: 700,
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
          lineHeight: 1.1,
          mb: 3,
          px: 2
        }}>
          Find Your Next<br/>
          <Box component="span" sx={{ 
            background: 'linear-gradient(45deg,rgb(45, 131, 243) 0%,rgb(45, 131, 243) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Career Opportunity
          </Box>
        </Typography>

        <Typography variant="subtitle1" sx={{ 
          maxWidth: 600,
          mx: 'auto',
          mb: 4,
          color: 'text.secondary',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          Discover your perfect career match from thousands of opportunities across top companies.
        </Typography>

        
      </Box>
    </Box>
  );
}