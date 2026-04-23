import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getCurrentUserController } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrentUserSchema } from '../validations/usersValidation.js';

const router = Router();

router.get(
  '/current',
  celebrate(getCurrentUserSchema),
  authenticate,
  getCurrentUserController,
);

export default router;
