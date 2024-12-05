// Login.js
import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        navigate('/taskmanager');
        onClose && onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    }
  };

  const handleClose = () => {
    onClose && onClose();
    navigate('/dashboard');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={false}>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Grid container spacing={0} alignItems="center" style={{ height: '100%' }}>
          <Grid item xs={5}>
            <Paper
              style={{
                padding: '2em',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#f4f4f4',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '1em', textAlign: 'center' }}>
                Welcome Back!
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '1em', fontWeight: 'bold', textAlign: 'center' }}>
                Login to your account
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
              <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>
                Login
              </Typography>
            </Box>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                style={{ width: '100%', maxWidth: '250px' }}
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                style={{ width: '100%', maxWidth: '250px' }}
                value={formData.password}
                onChange={handleInputChange}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '1em', width: '100px', alignSelf: 'center' }}
              >
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
