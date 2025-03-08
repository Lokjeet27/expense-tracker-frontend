import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogin } from '../features/authSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await dispatch(userLogin({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #EDFFF6, #4FFFB0)',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: '#2D6A4F', fontWeight: 'bold', marginBottom: 2 }}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 3 }}>
            Please login to your account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: '#4FFFB0',
              color: '#2D6A4F',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#3DDC99' },
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2, color: '#777' }}>
            Don't have an account? <a href="/register" style={{ color: '#2D6A4F', fontWeight: 'bold' }}>Sign Up</a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
