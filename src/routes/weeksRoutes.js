import { Router } from 'express';
import {
  getPrivateDashbordInfo,
  getPublicDashbordInfo,
  getMumStateByWeek,
  getBabyStateByWeek,
} from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { weekParamSchema } from '../validations/weeksValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Weeks
 *   description: Керування інформацією про стан мами та дитини за тижнями
 */

/**
 * @swagger
 * /api/weeks/status/private:
 *   get:
 *     summary: Отримати приватну інформацію дашборду (для авторизованих)
 *     tags: [Weeks]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     responses:
 *       200:
 *         description: Успішно отримано дані
 */
router.get('/status/private', authenticate, getPrivateDashbordInfo);
/**
 * @swagger
 * /api/weeks/status/public:
 *   get:
 *     summary: Отримати публічну інформацію дашборду
 *     description: Повертає загальну інформацію про тижні вагітності, доступну без реєстрації.
 *     tags: [Weeks]
 *     responses:
 *       200:
 *         description: Публічні дані успішно отримано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully fetched public dashboard info
 *                 data:
 *                   type: array
 *                   description: Список тижнів із базовою інформацією
 *                   items:
 *                     type: object
 *                     properties:
 *                       weekNumber:
 *                         type: integer
 *                         example: 1
 *                       shortDescription:
 *                         type: string
 *                         example: Початок вашої подорожі...
 */
router.get('/status/public', getPublicDashbordInfo);
/**
 * @swagger
 * /api/weeks/mom/{weekNumber}:
 *   get:
 *     summary: Отримати стан мами за номером тижня
 *     tags: [Weeks]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     parameters:
 *       - in: path
 *         name: weekNumber
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Номер тижня вагітності
 *     responses:
 *       200:
 *         description: Дані про стан мами
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeekInfoResponse'
 *       400:
 *         description: Помилка валідації (celebrate)
 *       401:
 *         description: Неавторизовано
 */
//mumStateByWeek
router.get(
  '/mom/:weekNumber',
  authenticate,
  celebrate(weekParamSchema),
  getMumStateByWeek,
);
/**
 * @swagger
 * /api/weeks/baby/{weekNumber}:
 *   get:
 *     summary: Отримати стан дитини за номером тижня
 *     tags: [Weeks]
 *     security:
 *       - sessionIdCookie: []
 *         accessTokenCookie: []
 *     parameters:
 *       - in: path
 *         name: weekNumber
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Дані про розвиток дитини
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeekInfoResponse'
 */
//babyStateByWeek
router.get(
  '/baby/:weekNumber',
  authenticate,
  celebrate(weekParamSchema),
  getBabyStateByWeek,
);
export default router;
