import { Router } from 'express';
import {
  getMumStateByWeek,
  getBabyStateByWeek,
  getPrivateDashbordInfo,
} from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { weekParamSchema } from '../validations/weeksValidation.js';

const router = Router();

//getPrivateDashbordInfo
router.get('/', authenticate, getPrivateDashbordInfo);

//mumStateByWeek
router.get(
  '/mom/:weekNumber',
  authenticate,
  celebrate(weekParamSchema),
  getMumStateByWeek,
);

//babyStateByWeek
router.get(
  '/baby/:weekNumber',
  authenticate,
  celebrate(weekParamSchema),
  getBabyStateByWeek,
);

export default router;
