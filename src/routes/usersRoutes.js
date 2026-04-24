import { Router } from 'express';
import {
  getCurrentUserController,
  updateTheme,
} from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { updateThemeShema } from '../validations/usersValidation.js';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);
router.patch('/theme', authenticate, celebrate(updateThemeShema), updateTheme);

export default router;
