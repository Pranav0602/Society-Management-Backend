import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip
} from '@mui/material';
import {
  Security,
  Home,
  People,
  Notifications,
  Payment,
  Assignment
} from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Access Control',
      description: 'Advanced security with visitor management and approval system'
    },
    {
      icon: <Home sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Society Management',
      description: 'Complete building and flat management system'
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Resident Portal',
      description: 'Easy complaint registration and maintenance tracking'
    },
    {
      icon: <Notifications sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Notifications',
      description: 'Instant updates via WebSocket for approvals and notices'
    },
    {
      icon: <Payment sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Maintenance Billing',
      description: 'Automated billing and payment tracking system'
    },
    {
      icon: <Assignment sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Admin Dashboard',
      description: 'Comprehensive admin tools for society management'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 2 }}
              >
                Smart Society
                <br />
                Management System
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your housing society operations with our comprehensive management platform.
                From visitor logs to maintenance billing, we've got everything covered.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'grey.300',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 400
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h5" gutterBottom align="center">
                    Key Features
                  </Typography>
                  <Stack spacing={2}>
                    <Chip label="Visitor Management" color="primary" variant="outlined" />
                    <Chip label="Complaint System" color="primary" variant="outlined" />
                    <Chip label="Maintenance Billing" color="primary" variant="outlined" />
                    <Chip label="Real-time Notifications" color="primary" variant="outlined" />
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of societies already using our platform for efficient management.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Get Started Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'grey.300',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;