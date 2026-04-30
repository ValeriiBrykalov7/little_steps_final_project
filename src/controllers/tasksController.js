import createHttpError from 'http-errors';
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
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { isDone } = req.body;

  const result = await Task.findOneAndUpdate(
    { _id: taskId, userId: req.user.id },
    { isDone },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!result) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json(result);
};
