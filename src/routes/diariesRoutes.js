import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createDiary, getAllDiary } from '../controllers/diariesController.js';
import { createDiarySchema } from '../validations/diariesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// router.use('/api/diaries', authenticate);

router.get('/allDiary', authenticate, getAllDiary);
router.post(
  '/createDiary',
  authenticate,
  celebrate(createDiarySchema),
  createDiary,
);

export default router;
