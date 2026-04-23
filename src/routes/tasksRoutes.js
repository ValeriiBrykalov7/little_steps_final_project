import { Router } from 'express';
import { createTask, getTasks } from '../controllers/tasksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateTask } from '../validations/tasksValidation.js';

const router = Router();

router.post('/', authenticate, validateTask, createTask);
router.get('/', authenticate, getTasks);

export default router;
