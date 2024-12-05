import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import './taskManager.css'; // Ensure you have your custom CSS for styling

const AddTaskDialog = ({ open, onClose, onAddTask }) => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority

  // Handle task submission
  const handleAddTask = async () => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You need to be logged in to add tasks.");
      return;
    }

    // Prepare task data
    const taskData = {
      title,
      date,
      time,
      description,
      priority
    };

    try {
      // Use fetch instead of axios
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Task added successfully', data);
        onAddTask(data); // Update parent component with new task
        onClose(); // Close the dialog
        resetForm();
      } else {
        console.error('Error adding task: ', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task', error.message);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Time"
              variant="outlined"
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup
                row
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="High" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddTask} color="primary" variant="contained">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
