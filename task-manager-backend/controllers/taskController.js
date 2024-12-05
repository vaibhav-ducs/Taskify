const Task = require('../models/Task');

// ./controllers/taskController.js

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create new task
const createTask = async (req, res) => {
  const { title, date, time, description, priority } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Authorization required' });
    }

    const newTask = new Task({
      title,
      date,
      time,
      description,
      priority,
      createdBy: req.user.id, // User-specific task assignment
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task' });
  }
};


// Update task
const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

// Delete task
const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
