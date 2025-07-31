import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Divider,
  Alert,
  Badge,
  IconButton
} from '@mui/material';
import {
  Security,
  PersonAdd,
  Report,
  CheckCircle,
  Cancel,
  ExitToApp,
  Add,
  TrendingUp,
  TrendingDown,
  Schedule
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { VisitorLog } from '../../types';

const GuardDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [stats, setStats] = useState({
    todayVisitors: 0,
    pendingApprovals: 0,
    approvedVisitors: 0,
    rejectedVisitors: 0,
    activeVisitors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuardData = async () => {
      try {
        setLoading(true);
        // Mock data for now
        const mockVisitorLogs = [
          {
            id: '1',
            visitorName: 'John Doe',
            visitorPhone: '+1234567890',
            purpose: 'Delivery',
            flatNumber: 'A-101',
            status: 'PENDING' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            visitorName: 'Jane Smith',
            visitorPhone: '+1234567891',
            purpose: 'Family Visit',
            flatNumber: 'B-205',
            status: 'APPROVED' as const,
            entryTime: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            visitorName: 'Mike Johnson',
            visitorPhone: '+1234567892',
            purpose: 'Maintenance',
            flatNumber: 'C-301',
            status: 'REJECTED' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        const today = new Date().toDateString();
        const todayVisitors = mockVisitorLogs.filter(v => 
          new Date(v.createdAt).toDateString() === today
        ).length;

        const pendingApprovals = mockVisitorLogs.filter(v => v.status === 'PENDING').length;
        const approvedVisitors = mockVisitorLogs.filter(v => v.status === 'APPROVED').length;
        const rejectedVisitors = mockVisitorLogs.filter(v => v.status === 'REJECTED').length;
        const activeVisitors = mockVisitorLogs.filter(v => 
          v.status === 'APPROVED' && v.entryTime && !v.exitTime
        ).length;

        setStats({
          todayVisitors,
          pendingApprovals,
          approvedVisitors,
          rejectedVisitors,
          activeVisitors
        });

        setVisitorLogs(mockVisitorLogs);
      } catch (error) {
        console.error('Error fetching guard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardData();
  }, []);

  const quickActions = [
    { title: 'Log New Visitor', icon: <PersonAdd />, path: '/visitor-logs/new', color: 'primary' },
    { title: 'Security Report', icon: <Report />, path: '/security-reports', color: 'secondary' },
    { title: 'Active Visitors', icon: <CheckCircle />, path: '/visitor-logs/active', color: 'success' },
    { title: 'Exit Log', icon: <ExitToApp />, path: '/visitor-logs/exit', color: 'warning' }
  ];

  const statCards = [
    {
      title: 'Today\'s Visitors',
      value: stats.todayVisitors,
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: <Schedule sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning'
    },
    {
      title: 'Approved Visitors',
      value: stats.approvedVisitors,
      icon: <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success'
    },
    {
      title: 'Active Visitors',
      value: stats.activeVisitors,
      icon: <PersonAdd sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleApproveVisitor = (visitorId: string) => {
    // In real app, call API to approve visitor
    console.log('Approving visitor:', visitorId);
  };

  const handleRejectVisitor = (visitorId: string) => {
    // In real app, call API to reject visitor
    console.log('Rejecting visitor:', visitorId);
  };

  const handleRecordExit = (visitorId: string) => {
    // In real app, call API to record exit
    console.log('Recording exit for visitor:', visitorId);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Security Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} component="div">
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {card.icon}
                  <Box sx={{ ml: 'auto' }}>
                    <Chip
                      label={card.title}
                      color={card.color as any}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} component="div">
              <Button
                variant="outlined"
                startIcon={action.icon}
                fullWidth
                onClick={() => navigate(action.path)}
                sx={{ height: 56 }}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Visitor Logs */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Security sx={{ mr: 1 }} />
          <Typography variant="h6">Recent Visitor Logs</Typography>
          <Button
            size="small"
            sx={{ ml: 'auto' }}
            onClick={() => navigate('/visitor-logs')}
          >
            View All
          </Button>
        </Box>
        <List>
          {visitorLogs.map((visitor, index) => (
            <React.Fragment key={visitor.id}>
              <ListItem>
                <ListItemIcon>
                  <Security color={visitor.status === 'APPROVED' ? 'success' : 'primary'} />
                </ListItemIcon>
                <ListItemText
                  primary={visitor.visitorName}
                  secondary={`${visitor.purpose} • Flat ${visitor.flatNumber} • ${visitor.visitorPhone}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={visitor.status}
                    color={getStatusColor(visitor.status) as any}
                    size="small"
                  />
                  {visitor.status === 'PENDING' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleApproveVisitor(visitor.id)}
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRejectVisitor(visitor.id)}
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  )}
                  {visitor.status === 'APPROVED' && !visitor.exitTime && (
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => handleRecordExit(visitor.id)}
                    >
                      <ExitToApp />
                    </IconButton>
                  )}
                </Box>
              </ListItem>
              {index < visitorLogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        {visitorLogs.length === 0 && (
          <Alert severity="info">
            No visitor logs found.
          </Alert>
        )}
      </Paper>

      {/* Security Alerts */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Security Alerts
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>3 visitors</strong> currently inside the premises
        </Alert>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <strong>2 pending approvals</strong> require immediate attention
        </Alert>
        <Alert severity="success">
          <strong>Security check</strong> completed successfully at 2:00 PM
        </Alert>
      </Paper>

      {/* Security Tips */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Security Tips
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Alert severity="info" icon={<Security />}>
              Always verify visitor identity before allowing entry
            </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="warning" icon={<Schedule />}>
              Record exit time for all approved visitors
            </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="success" icon={<CheckCircle />}>
              Maintain detailed logs for security audits
            </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="info" icon={<Report />}>
              Report suspicious activities immediately
            </Alert>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default GuardDashboard;