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

router.get('/status/private', authenticate, getPrivateDashbordInfo);
router.get('/status/public', getPublicDashbordInfo);

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
