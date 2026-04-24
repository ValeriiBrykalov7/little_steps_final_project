import { Router } from 'express';
import { getCurrentUserController } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);

export default router;
