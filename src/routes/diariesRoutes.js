import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createDiary,
  getAllDiary,
  updateDiary,
  deleteDiary,
} from '../controllers/diariesController.js';
import {
  createDiarySchema,
  deleteDiarySchema,
  updateDiarySchema,
} from '../validations/diariesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Diaries
 *   description: Керування записами
 */
/**
 * @swagger
 * /api/diaries/allDiary:
 *   get:
 *     summary: Отримати список записів
 *     tags: [Diaries]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     responses:
 *       200:
 *         description: Список записів
 */
router.get('/allDiary', authenticate, getAllDiary);
/**
 * @swagger
 * /api/diaries/createDiary:
 *   post:
 *     summary: Додати запис у щоденник
 *     tags: [Diaries]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiaryRequest'
 *     responses:
 *       201:
 *         description: Запис додано
 */
router.post(
  '/createDiary',
  authenticate,
  celebrate(createDiarySchema),
  createDiary,
);
/**
 * @swagger
 * /api/diaries/deleteDiary/{entryId}:
 *   delete:
 *     summary: Видалити запис
 *     tags: [Diaries]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     parameters:
 *       - in: path
 *         name: entryId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     responses:
 *       200:
 *         description: Запис видалено
 */
router.delete(
  '/deleteDiary/:entryId',
  authenticate,
  celebrate(deleteDiarySchema),
  deleteDiary,
);
/**
 * @swagger
 * /api/diaries/updateDiary/{entryId}:
 *   patch:
 *     summary: Оновити запис
 *     tags: [Diaries]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDiaryRequest'
 *     responses:
 *       200:
 *         description: Статус завдання успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Diary'
 *       400:
 *         description: Помилка валідації (надіслано невірний тип даних)
 *       401:
 *         description: Неавторизовано (відсутній або невірний токен)
 *       404:
 *         description: Завдання з таким ID не знайдено
 */
router.patch(
  '/updateDiary/:entryId',
  authenticate,
  celebrate(updateDiarySchema),
  updateDiary,
);

export default router;
