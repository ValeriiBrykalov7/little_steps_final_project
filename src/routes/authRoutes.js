import { celebrate } from 'celebrate';
import { Router } from 'express';
import { login, logout, refreshSession, register } from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Керування аутентифікацією та сесіями
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Успішна реєстрація
 *       400:
 *         $ref: '#/components/schemas/ValidationError'
 */
router.post('/register', celebrate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вхід у систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Успішний вхід, повертає токени
 *       401:
 *         description: Невірний email або пароль
 */
router.post('/login', celebrate(loginSchema), login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Вихід (деактивація сесії)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Сесію видалено
 */
router.post('/logout', authenticate, logout);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Оновлення токенів
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Нова пара токенів
 */
router.post('/refresh', refreshSession);

export default router;
