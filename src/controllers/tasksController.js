// TasksController
import { Task } from '../models/task.js';

export const updateTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { isDone } = req.body;

  try {

    const result = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.id },
      { isDone },
      { new: true } 
    );

    if (!result) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
