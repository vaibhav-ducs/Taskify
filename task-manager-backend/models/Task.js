const mongoose = require('mongoose');

// Define the Task Schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  date: {
    type: Date,
    required: true,  // Date when the task is due
  },
  time: {
    type: String,
    required: true,  // Time when the task is due (formatted as a string, e.g., "14:00")
  },
  description: {
    type: String,
    required: true,  // Description is required
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',  // Default priority is 'Medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User who created the task
    ref: 'User',
    required: true,  // Task is linked to a user
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create and export the Task model
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
