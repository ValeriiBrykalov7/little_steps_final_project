import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { updateTaskStatus } from '../controllers/tasksController.js';



const router = Router();

router.patch('/:taskId/status', authenticate, updateTaskStatus);

export default router;
