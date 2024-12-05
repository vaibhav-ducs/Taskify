const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Get all tasks
router.get('/api/tasks', auth, async (req, res) => {
    try {
        await getTasks(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Create a new task
router.post('/api/tasks', auth, async (req, res) => {
    try {
        await createTask(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Update a task
router.put('/api/tasks/:id', auth, async (req, res) => {
    try {
        await updateTask(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        await deleteTask(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
