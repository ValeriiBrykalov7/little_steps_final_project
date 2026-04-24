import { Task } from '../models/task.js';

export const createTask = async (req, res) => {
  const userId = req.user._id;
  const newTask = await Task.create({ ...req.body, userId });
  res.status(201).json(newTask);
};

export const getTasks = async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ userId });
  res.status(200).json(tasks);
};
export const updateTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { isDone } = req.body;

  try {
    const result = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.id },
      { isDone },
      {
        new: true,
        runValidators: true
      }
    );

    if (!result) {
      return res.status(404).json({
        message: 'Task not found or user is not authorized to edit this task'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
