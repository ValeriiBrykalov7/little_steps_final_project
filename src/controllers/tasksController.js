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
