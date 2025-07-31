import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { PersonAdd, Business } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { Society } from '../types';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  role: yup.string().oneOf(['ADMIN', 'RESIDENT', 'GUARD']).required('Role is required'),
  societyId: yup.string().when('role', {
    is: (role: string) => role === 'RESIDENT' || role === 'GUARD',
    then: yup.string().required('Society is required'),
    otherwise: yup.string().optional(),
  }),
}).required();

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN' | 'RESIDENT' | 'GUARD';
  societyId?: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [societies, setSocieties] = useState<Society[]>([]);
  const [showSocietyDialog, setShowSocietyDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const watchedRole = watch('role');

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const societiesData = await apiService.getSocieties();
        setSocieties(societiesData);
      } catch (error) {
        console.error('Error fetching societies:', error);
      }
    };

    fetchSocieties();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError('');
      await registerUser(data);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSociety = async (societyData: any) => {
    try {
      const newSociety = await apiService.createSociety(societyData);
      setSocieties([...societies, newSociety]);
      setValue('societyId', newSociety.id);
      setShowSocietyDialog(false);
    } catch (error) {
      console.error('Error creating society:', error);
    }
  };

  const steps = ['Personal Information', 'Role Selection', 'Society Details'];

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <PersonAdd sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          
          <Typography component="h1" variant="h5" gutterBottom>
            Create Account
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join our society management platform
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Role">
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="RESIDENT">Resident</MenuItem>
                        <MenuItem value="GUARD">Guard</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {(watchedRole === 'RESIDENT' || watchedRole === 'GUARD') && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl fullWidth error={!!errors.societyId}>
                      <InputLabel>Select Society</InputLabel>
                      <Controller
                        name="societyId"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} label="Select Society">
                            {societies.map((society) => (
                              <MenuItem key={society.id} value={society.id}>
                                {society.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                    <Button
                      variant="outlined"
                      startIcon={<Business />}
                      onClick={() => setShowSocietyDialog(true)}
                    >
                      Create New
                    </Button>
                  </Box>
                </Grid>
              )}

              {watchedRole === 'ADMIN' && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    As an Admin, you can create a new society after registration or join an existing one.
                  </Alert>
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <MuiLink component={Link} to="/login" variant="body2">
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Create Society Dialog */}
      <CreateSocietyDialog
        open={showSocietyDialog}
        onClose={() => setShowSocietyDialog(false)}
        onSubmit={handleCreateSociety}
      />
    </Container>
  );
};

// Create Society Dialog Component
interface CreateSocietyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateSocietyDialog: React.FC<CreateSocietyDialogProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    numberOfBuildings: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Society</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Society Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Number of Buildings"
            type="number"
            value={formData.numberOfBuildings}
            onChange={(e) => setFormData({ ...formData, numberOfBuildings: parseInt(e.target.value) })}
            margin="normal"
            inputProps={{ min: 1 }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create Society
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterPage;