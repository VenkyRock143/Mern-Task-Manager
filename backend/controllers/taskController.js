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
      const task = await Task.findById(req.params.id);
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      await task.remove();
      res.json({ message: 'Task deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};

// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const createTask = async (req, res) => {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status,
//   });

//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     task.title = req.body.title ?? task.title;
//     task.description = req.body.description ?? task.description;
//     task.status = req.body.status ?? task.status;

//     const updatedTask = await task.save();
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     await task.remove();
//     res.json({ message: 'Task deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getTasks, createTask, updateTask, deleteTask };
