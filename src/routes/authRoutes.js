import { celebrate } from 'celebrate';
import { Router } from 'express';
import { googleAuth, login, logout, refreshSession, register } from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/register', celebrate(registerSchema), register);
router.post('/login', celebrate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.post('/refresh', refreshSession);
router.post('/google', googleAuth);

export default router;
