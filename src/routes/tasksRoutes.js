import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/tasksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { createTaskSchema, updateTaskStatusSchema } from '../validations/tasksValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post(
  '/createTask',
  authenticate,
  celebrate(createTaskSchema),
  createTask,
);
router.get('/allTasks', authenticate, getTasks);
router.patch('/update/:taskId', authenticate, celebrate(updateTaskStatusSchema), updateTaskStatus);
export default router;
