import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
  Business as BusinessIcon,
  Report as ReportIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import ResidentDashboard from '../components/dashboard/ResidentDashboard';
import GuardDashboard from '../components/dashboard/GuardDashboard';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'ADMIN':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'Societies', icon: <BusinessIcon />, path: '/societies' },
          { text: 'Buildings', icon: <HomeIcon />, path: '/buildings' },
          { text: 'Flats', icon: <HomeIcon />, path: '/flats' },
          { text: 'Residents', icon: <PeopleIcon />, path: '/residents' },
          { text: 'Allocation Requests', icon: <AssignmentIcon />, path: '/allocation-requests' },
          { text: 'Complaints', icon: <ReportIcon />, path: '/complaints' },
          { text: 'Notices', icon: <MessageIcon />, path: '/notices' },
          { text: 'Maintenance Bills', icon: <PaymentIcon />, path: '/maintenance-bills' },
          { text: 'Visitor Logs', icon: <SecurityIcon />, path: '/visitor-logs' },
        ];
      case 'RESIDENT':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'My Flat', icon: <HomeIcon />, path: '/my-flat' },
          { text: 'Complaints', icon: <ReportIcon />, path: '/complaints' },
          { text: 'Maintenance Bills', icon: <PaymentIcon />, path: '/maintenance-bills' },
          { text: 'Notices', icon: <MessageIcon />, path: '/notices' },
          { text: 'Visitor Approvals', icon: <SecurityIcon />, path: '/visitor-approvals' },
        ];
      case 'GUARD':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'Visitor Logs', icon: <SecurityIcon />, path: '/visitor-logs' },
          { text: 'Security Reports', icon: <ReportIcon />, path: '/security-reports' },
        ];
      default:
        return [];
    }
  };

  const renderDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'RESIDENT':
        return <ResidentDashboard />;
      case 'GUARD':
        return <GuardDashboard />;
      default:
        return null;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'error';
      case 'RESIDENT':
        return 'primary';
      case 'GUARD':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Administrator';
      case 'RESIDENT':
        return 'Resident';
      case 'GUARD':
        return 'Security Guard';
      default:
        return 'User';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Society Management System
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={getRoleLabel()}
              color={getRoleColor()}
              size="small"
            />
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
            >
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user.email}
            </Typography>
          </Box>
          <Divider />
          <List>
            {getMenuItems().map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <AccountCircle sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderDashboardContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;