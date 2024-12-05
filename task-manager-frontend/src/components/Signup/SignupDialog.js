import React, { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const SignupDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);  // New state to handle errors
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        navigate('/login');  // Redirect to login on success
        onClose();
      } else {
        const result = await response.json();
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={false}>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Grid container spacing={0} alignItems="center" style={{ height: '100%' }}>
          {/* Left Side Content */}
          <Grid item xs={5}>
            <Paper style={{ padding: '2em', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
              <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '1em', textAlign: 'center' }}>Taskify</Typography>
              <Typography variant="body1" style={{ marginBottom: '1em', fontWeight: 'bold', textAlign: 'center' }}>Come Join Us!</Typography>
              <Typography variant="body2" style={{ textAlign: 'center' }}>We are so excited to have you here. Let's manage your tasks in a systematic and organized manner.</Typography>
            </Paper>
          </Grid>

          {/* Right Side Form */}
          <Grid item xs={7}>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
              <Typography variant="h5" align="center" style={{ fontWeight: 'bold' }}>Sign Up</Typography>
            </Box>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body2" align="center" style={{ marginBottom: '1em', fontStyle: 'italic' }}>Let's organize your tasks</Typography>
              <TextField name="username" label="Username" variant="outlined" margin="normal" style={{ width: '100%', maxWidth: '250px' }} value={formData.username} onChange={handleInputChange} />
              <TextField name="email" label="Email" variant="outlined" margin="normal" style={{ width: '100%', maxWidth: '250px' }} value={formData.email} onChange={handleInputChange} />
              <TextField name="password" label="Password" type="password" variant="outlined" margin="normal" style={{ width: '100%', maxWidth: '250px' }} value={formData.password} onChange={handleInputChange} />
              <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                <Typography variant="body2" style={{ marginRight: '0.5em' }}>Already have an account?</Typography>
                <Button component={Link} to="/login" color="primary">Login</Button>
              </Box>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1em', width: '100px', alignSelf: 'center' }}>Sign Up</Button>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
