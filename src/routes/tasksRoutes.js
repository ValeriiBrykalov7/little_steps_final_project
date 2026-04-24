import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/tasksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { createTaskSchema } from '../validations/tasksValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post(
  '/createTask',
  authenticate,
  celebrate(createTaskSchema),
  createTask,
);
router.get('/allTasks', authenticate, getTasks);
router.post('/:taskId/status', authenticate, updateTaskStatus);
export default router;
