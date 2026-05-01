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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Керування профілем користувача та налаштуваннями
 */
/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Отримати дані поточного користувача
 *     tags: [Users]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     responses:
 *       200:
 *         description: Дані профілю успішно отримано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Неавторизовано
 */

router.get('/current', authenticate, getCurrentUserController);
/**
 * @swagger
 * /api/users/theme:
 *   patch:
 *     summary: Змінити колірну тему
 *     tags: [Users]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateThemeRequest'
 *     responses:
 *       200:
 *         description: Тему успішно змінено
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.patch('/theme', authenticate, celebrate(updateThemeShema), updateTheme);
/**
 * @swagger
 * /api/users/me/avatar:
 *   put:
 *     summary: Оновити аватар користувача
 *     tags: [Users]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Файл зображення (jpg, png, webp)
 *     responses:
 *       200:
 *         description: Аватар успішно оновлено
 *       400:
 *         description: Помилка завантаження файлу
 */
router.put(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     summary: Оновити інформацію профілю
 *     description: Дозволяє змінити username, email, стать або очікувану дату пологів.
 *     tags: [Users]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Дані успішно оновлено
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.patch(
  '/me',
  authenticate,
  upload.single('photo'),
  celebrate(updateUserValidation),
  updateUserInfo,
);

export default router;
