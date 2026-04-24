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

router.get('/allDiary', authenticate, getAllDiary);

router.post(
  '/createDiary',
  authenticate,
  celebrate(createDiarySchema),
  createDiary,
);
router.delete(
  '/deleteDiary/:entryId',
  authenticate,
  celebrate(deleteDiarySchema),
  deleteDiary,
);
router.patch(
  '/updateDiary/:entryId',
  authenticate,
  celebrate(updateDiarySchema),
  updateDiary,
);

export default router;
