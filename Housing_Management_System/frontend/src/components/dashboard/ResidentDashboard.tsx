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
  Avatar,
  Badge
} from '@mui/material';
import {
  Home,
  Report,
  Payment,
  Message,
  Security,
  Add,
  CheckCircle,
  Warning,
  Info,
  Person
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Complaint, MaintenanceBill, Notice, VisitorLog, FlatMember } from '../../types';

const ResidentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [flatInfo, setFlatInfo] = useState<any>(null);
  const [flatMembers, setFlatMembers] = useState<FlatMember[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [maintenanceBills, setMaintenanceBills] = useState<MaintenanceBill[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [visitorApprovals, setVisitorApprovals] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        setLoading(true);
        // Mock data for now - in real app, fetch based on user's flat
        const mockFlatInfo = {
          flatNumber: 'A-101',
          buildingName: 'Building A',
          floorNumber: 1,
          isAllocated: true
        };

        const mockComplaints = [
          {
            id: '1',
            title: 'Water leakage in bathroom',
            description: 'There is water leakage from the ceiling in the bathroom',
            category: 'MAINTENANCE' as const,
            priority: 'HIGH' as const,
            status: 'IN_PROGRESS' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        const mockBills = [
          {
            id: '1',
            amount: 2500,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'PENDING' as const,
            description: 'Monthly maintenance bill',
            month: 'December',
            year: 2024,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        const mockNotices = [
          {
            id: '1',
            title: 'Society Annual Meeting',
            content: 'Annual general body meeting scheduled for next Sunday',
            priority: 'HIGH' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        const mockVisitors = [
          {
            id: '1',
            visitorName: 'John Doe',
            visitorPhone: '+1234567890',
            purpose: 'Delivery',
            flatNumber: 'A-101',
            status: 'PENDING' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        setFlatInfo(mockFlatInfo);
        setComplaints(mockComplaints);
        setMaintenanceBills(mockBills);
        setNotices(mockNotices);
        setVisitorApprovals(mockVisitors);
      } catch (error) {
        console.error('Error fetching resident data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidentData();
  }, []);

  const quickActions = [
    { title: 'Register Complaint', icon: <Add />, path: '/complaints/new', color: 'error' },
    { title: 'Pay Bill', icon: <Payment />, path: '/maintenance-bills', color: 'primary' },
    { title: 'Add Family Member', icon: <Person />, path: '/my-flat/members', color: 'secondary' },
    { title: 'View Notices', icon: <Message />, path: '/notices', color: 'info' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'PAID':
      case 'RESOLVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
      case 'OVERDUE':
        return 'error';
      default:
        return 'default';
    }
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
        Welcome back, {user?.name}!
      </Typography>

      {/* Flat Information */}
      {flatInfo && (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Home sx={{ mr: 2, fontSize: 40 }} />
            <Box>
              <Typography variant="h5" gutterBottom>
                Flat {flatInfo.flatNumber}
              </Typography>
              <Typography variant="body1">
                {flatInfo.buildingName} • Floor {flatInfo.floorNumber}
              </Typography>
            </Box>
            <Chip
              label={flatInfo.isAllocated ? 'Allocated' : 'Not Allocated'}
              color={flatInfo.isAllocated ? 'success' : 'warning'}
              sx={{ ml: 'auto' }}
            />
          </Box>
        </Paper>
      )}

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

      {/* Dashboard Content */}
      <Grid container spacing={3}>
        {/* Recent Complaints */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Report sx={{ mr: 1 }} />
              <Typography variant="h6">My Complaints</Typography>
              <Button
                size="small"
                sx={{ ml: 'auto' }}
                onClick={() => navigate('/complaints')}
              >
                View All
              </Button>
            </Box>
            <List>
              {complaints.map((complaint, index) => (
                <React.Fragment key={complaint.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Report color={complaint.priority === 'URGENT' ? 'error' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={complaint.title}
                      secondary={`${complaint.category} • ${complaint.status}`}
                    />
                    <Chip
                      label={complaint.priority}
                      color={
                        complaint.priority === 'URGENT' ? 'error' :
                        complaint.priority === 'HIGH' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </ListItem>
                  {index < complaints.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {complaints.length === 0 && (
              <Alert severity="info">
                No complaints registered yet.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Maintenance Bills */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Payment sx={{ mr: 1 }} />
              <Typography variant="h6">Maintenance Bills</Typography>
              <Button
                size="small"
                sx={{ ml: 'auto' }}
                onClick={() => navigate('/maintenance-bills')}
              >
                View All
              </Button>
            </Box>
            <List>
              {maintenanceBills.map((bill, index) => (
                <React.Fragment key={bill.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Payment color={bill.status === 'PAID' ? 'success' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`₹${bill.amount}`}
                      secondary={`${bill.month} ${bill.year} • Due: ${new Date(bill.dueDate).toLocaleDateString()}`}
                    />
                    <Chip
                      label={bill.status}
                      color={getStatusColor(bill.status) as any}
                      size="small"
                    />
                  </ListItem>
                  {index < maintenanceBills.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {maintenanceBills.length === 0 && (
              <Alert severity="info">
                No maintenance bills found.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Recent Notices */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Message sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Notices</Typography>
              <Button
                size="small"
                sx={{ ml: 'auto' }}
                onClick={() => navigate('/notices')}
              >
                View All
              </Button>
            </Box>
            <List>
              {notices.map((notice, index) => (
                <React.Fragment key={notice.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Message color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={notice.title}
                      secondary={new Date(notice.createdAt).toLocaleDateString()}
                    />
                    <Chip
                      label={notice.priority}
                      color={
                        notice.priority === 'URGENT' ? 'error' :
                        notice.priority === 'HIGH' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </ListItem>
                  {index < notices.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {notices.length === 0 && (
              <Alert severity="info">
                No notices available.
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Visitor Approvals */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ mr: 1 }} />
              <Typography variant="h6">Visitor Approvals</Typography>
              <Button
                size="small"
                sx={{ ml: 'auto' }}
                onClick={() => navigate('/visitor-approvals')}
              >
                View All
              </Button>
            </Box>
            <List>
              {visitorApprovals.map((visitor, index) => (
                <React.Fragment key={visitor.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Security color={visitor.status === 'APPROVED' ? 'success' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={visitor.visitorName}
                      secondary={`${visitor.purpose} • ${visitor.visitorPhone}`}
                    />
                    <Chip
                      label={visitor.status}
                      color={getStatusColor(visitor.status) as any}
                      size="small"
                    />
                  </ListItem>
                  {index < visitorApprovals.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {visitorApprovals.length === 0 && (
              <Alert severity="info">
                No visitor approval requests.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Alerts */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Important Alerts
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <strong>Maintenance bill</strong> due in 7 days. Amount: ₹2,500
        </Alert>
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>1 visitor</strong> waiting for your approval
        </Alert>
        <Alert severity="success">
          <strong>Society meeting</strong> scheduled for next Sunday at 10 AM
        </Alert>
      </Paper>
    </Box>
  );
};

export default ResidentDashboard;