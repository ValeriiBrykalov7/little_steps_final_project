import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/tasksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { createTaskSchema, updateTaskStatusSchema } from '../validations/tasksValidation.js';
import { celebrate } from 'celebrate';

const router = Router();
/**
 * @swagger
 * /api/tasks/createTask:
 *   post:
 *     summary: Створити нове завдання
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *     responses:
 *       201:
 *         description: Завдання створено
 *       400:
 *         $ref: '#/components/schemas/ValidationError'
 */
router.post(
  '/createTask',
  authenticate,
  celebrate(createTaskSchema),
  createTask,
);

/**
 * @swagger
 * /api/tasks/allTasks:
 *   get:
 *     summary: Отримати список завдань
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список завдань
 */
router.get('/allTasks', authenticate, getTasks);

/**
 * @swagger
 * /api/tasks/update/{taskId}:
 *   patch:
 *     summary: Оновити статус (виконано/не виконано)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskStatusRequest'
 *     responses:
 *       200:
 *         description: Статус оновлено
 */
router.patch('/update/:taskId', authenticate, celebrate(updateTaskStatusSchema), updateTaskStatus);
export default router;
