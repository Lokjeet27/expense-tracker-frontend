import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError(null);
    setSuccess(false);

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      if (response.status === 201) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
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
            Create an Account
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 3 }}>
            Join us today! Please enter your details.
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Registration successful! Redirecting...</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: '#4FFFB0',
                color: '#2D6A4F',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#3DDC99' },
              }}
            >
              Register
            </Button>
          </form>

          <Typography variant="body2" sx={{ marginTop: 2, color: '#777' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#2D6A4F', fontWeight: 'bold' }}>
              Sign In
            </a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
