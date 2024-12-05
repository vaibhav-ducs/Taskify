import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';
import SignupDialog from '../Signup/SignupDialog';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper, TextField, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import image1 from '../images/Dashboard/image1.png';
import organizeImage from '../images/Dashboard/image1.png';
import calendarImage from '../images/Dashboard/image1.png';
import modifyImage from '../images/Dashboard/image1.png';

function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to server)
    console.log(formData);
    setFormData({ name: '', email: '', review: '' }); // Reset form after submission
  };

  return (
    <div className="Dashboard" style={{ backgroundColor: '#D3D3D3', minHeight: '100vh' }}>
      {/* Fixed Top Navigation Bar */}
      <AppBar position="fixed" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Task Manager
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" component={RouterLink} to="/dashboard" style={{ color: 'white' }}>Home</Button>
          <ScrollLink to="about-section" smooth={true} duration={500}>
            <Button color="inherit" style={{ color: 'white' }}>About</Button>
          </ScrollLink>
          <Button color="inherit" component={RouterLink} to="/login" style={{ color: 'white' }}>Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content with Introductory Image */}
      <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '2em' }}>
        <Typography variant="h4" style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
          Welcome to your Personalized Task Manager
        </Typography>
        <img src={image1} alt="Dashboard Intro" style={{ width: '100%', borderRadius: '8px' }} />
        <Typography variant="body1" style={{ marginTop: '1em', marginBottom: '1em', color: '#555', fontWeight: 'bold', fontSize: '1.25rem'}}>
          Stay organized, meet deadlines, and track your goals with ease.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          style={{ margin: '1em', backgroundColor: '#000', color: '#fff' }}>
          Get Started
        </Button>

        {/* Use the SignupDialog component */}
        <SignupDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

        {/* About Section */}
        <Element name="about-section">
          <Container style={{ marginTop: '2em' }}>
            <Typography variant="h5" style={{ marginBottom: '1.5em', color: '#333', fontWeight: 'bold', fontSize: '2rem' }}>
              About Our Features
            </Typography>

            {/* Feature 1 */}
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '1em' }}>
              <Grid item xs={12} md={6}>
                <img src={organizeImage} alt="Organize Tasks" style={{ width: '100%', borderRadius: '8px' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper style={{ padding: '1em', backgroundColor: '#fff' }}>
                  <div style={{ backgroundColor: '#333', padding: '0.5em' }}>
                    <Typography variant="h6" style={{ color: '#f0f0f0', fontWeight: 'bold' }}>
                      Organize Your Tasks Efficiently
                    </Typography>
                  </div>
                  <Typography variant="body1" style={{ color: '#333', marginTop: '0.5em' }}>
                    Keep your tasks organized and prioritized to achieve your daily goals effectively.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Feature 2 */}
            <Grid container spacing={2} alignItems="center" direction="row-reverse" style={{ marginBottom: '1em' }}>
              <Grid item xs={12} md={6}>
                <img src={calendarImage} alt="Calendar Notifications" style={{ width: '100%', borderRadius: '8px' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper style={{ padding: '1em', backgroundColor: '#fff' }}>
                  <div style={{ backgroundColor: '#333', padding: '0.5em' }}>
                    <Typography variant="h6" style={{ color: '#f0f0f0', fontWeight: 'bold' }}>
                      Calendar & Notifications
                    </Typography>
                  </div>
                  <Typography variant="body1" style={{ color: '#333', marginTop: '0.5em' }}>
                    Get reminders and email notifications for your upcoming tasks and deadlines.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Feature 3 */}
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '1em' }}>
              <Grid item xs={12} md={6}>
                <img src={modifyImage} alt="Add/Remove Tasks" style={{ width: '100%', borderRadius: '8px' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper style={{ padding: '1em', backgroundColor: '#fff' }}>
                  <div style={{ backgroundColor: '#333', padding: '0.5em' }}>
                    <Typography variant="h6" style={{ color: '#f0f0f0', fontWeight: 'bold' }}>
                      Task Management
                    </Typography>
                  </div>
                  <Typography variant="body1" style={{ color: '#333', marginTop: '0.5em' }}>
                    Easily add, remove, and modify tasks to stay on top of your work.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Element>
      </Container>

      {/* Contact Us Section */}
      <Container style={{ backgroundColor: '#D3D3D3', padding: '2em 0', width: '100%' }}>
        <Box style={{ textAlign: 'center', padding: '2em' }}>
          <Typography variant="h5" style={{ marginBottom: '1em', fontWeight: 'bold' }}>
            Write a Review
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              style={{ marginBottom: '1em', width: '300px' }}
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              style={{ marginBottom: '1em', width: '300px' }}
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              name="review"
              label="Review"
              variant="outlined"
              multiline
              rows={4}
              style={{ marginBottom: '1em', width: '300px' }}
              value={formData.review}
              onChange={handleInputChange}
            />
            <Button variant="contained" type="submit" style={{ backgroundColor: '#000', color: '#fff' }}>
              Submit
            </Button>
          </form>
        </Box>
        <Box style={{ textAlign: 'center', padding: '1em' }}>
          <Typography variant="h6" style={{ marginBottom: '0.5em' }}>
            Developed By:
          </Typography>
          <Typography variant="body1" style={{ color: '#555', marginBottom: '0.5em' }}>
            Vaibhav Maheshwari
          </Typography>
          <Typography variant="body1" style={{ color: '#555' }}>
            New Delhi
          </Typography>
          <Box mt={2}>
            <a href="https://www.linkedin.com/in/vaibhav2811/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon style={{ fontSize: '40px', color: '#0077b5' }} />
            </a>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard;
