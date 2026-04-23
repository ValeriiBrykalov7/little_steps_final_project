import { celebrate } from 'celebrate';
import { Router } from 'express';
import { login, logout, refreshSession, register } from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerSchema), register);
router.post('/login', celebrate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshSession);

export default router;
