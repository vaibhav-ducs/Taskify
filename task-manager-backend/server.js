require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure these paths are correct
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from the frontend server
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Routes for authentication
app.use('/api/tasks', taskRoutes);  // Routes for task management

// MongoDB Connection (Updated without deprecated options)
mongoose.connect('mongodb+srv://vaibhav123:myproject1@cluster0.9kupk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')  // Replace with your actual MongoDB connection string
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  })
  .catch(err => console.error(err));
