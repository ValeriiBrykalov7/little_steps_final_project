import { Router } from 'express';
import {
  getCurrentUserController,
  updateUserAvatar,
  updateUserInfo
} from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { updateUserValidation } from '../validations/usersValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);
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
