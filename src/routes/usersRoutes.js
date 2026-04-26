import { Router } from 'express';

import {
  getCurrentUserController,
  updateTheme,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/usersController.js';

import { upload } from '../middleware/multer.js';
import {
  updateUserValidation,
  updateThemeShema,
} from '../validations/usersValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

router.get('/current', authenticate, getCurrentUserController);
router.patch('/theme', authenticate, celebrate(updateThemeShema), updateTheme);
router.put(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);
router.patch(
  '/me',
  authenticate,
  celebrate(updateUserValidation),
  updateUserInfo,
);

export default router;
