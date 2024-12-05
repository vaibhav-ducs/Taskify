import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './taskManager.css'; // Import CSS for styling
import { Button } from '@mui/material';
import AddTaskDialog from './AddTaskDialog';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  // Fetch tasks from the backend for the current user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks', {  // Make sure the URL is correct
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',  // Set content type
          }
        });
        console.log("Response: ", response);
        if (!response.ok) {
          // Log the status and status text for more information
          console.error("Network response was not ok:", response.status, response.statusText);
          return;
        }
  
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error in fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);

  // Function to render task indicators on the calendar dates
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskOnThisDate = tasks.some(
        task => new Date(task.dueDate).toDateString() === date.toDateString()
      );
      return taskOnThisDate ? <span className="task-indicator">&#9679;</span> : null;
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/dashboard'; // Redirect to dashboard
  };

  const handleAddTaskOpen = () => setOpenAddTaskDialog(true);
  const handleAddTaskClose = () => setOpenAddTaskDialog(false);

  const handleAddTask = (taskData) => {
    // API call to add task in the backend
    console.log("Task added:", taskData); // Placeholder for backend connection
  };

  return (
    <div className="task-manager-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">Task Manager</div>
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => alert('Upcoming Tasks Coming Soon')}>Upcoming Tasks</button>
          <button className="navbar-link" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Calendar and Task Buttons */}
      <div className="task-manager-content">
        <h2>Manage Your Tasks</h2>
        
        <Calendar 
          onChange={setDate}
          value={date}
          tileContent={tileContent}
        />

        <div className="task-buttons">
          <Button variant="contained" color="primary" onClick={handleAddTaskOpen}>
            Add Task
          </Button>

          <AddTaskDialog
            open={openAddTaskDialog}
            onClose={handleAddTaskClose}
            onAddTask={handleAddTask}
          />
          <button className="task-button delete-task">Delete Task</button>
          <button className="task-button modify-task">Modify Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
