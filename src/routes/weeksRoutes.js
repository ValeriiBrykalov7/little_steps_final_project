import { Router } from 'express';
import { unauthorizedUserInfo, getMumStateByWeek } from '../controllers/weeksController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { weekParamSchema } from '../validations/weeksValidation.js';

const router = Router();

//mumStateByWeek
router.get(
  '/:weekNumber',
  authenticate,
  celebrate(weekParamSchema),
  getMumStateByWeek,
);

router.get('/', unauthorizedUserInfo);

export default router;
