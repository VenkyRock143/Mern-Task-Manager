const Task = require('../models/task');

// Get all tasks
const getTasks = async (req, res) => {
  try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = new Task({ title, description, status });

  try {
      const newTask = await task.save();
      res.status(201).json(newTask);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  const { status } = req.body;

  try {
      const task = await Task.findById(req.params.id);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      task.status = status;
      await task.save();
      res.json(task);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    console.log('Deleting task with ID:', req.params.id); // Debug line
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.log('Task not found'); // Debug line
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne();
    console.log('Task deleted successfully'); // Debug line
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err); // Debug line
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
