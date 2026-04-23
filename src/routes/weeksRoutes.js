import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getBabyStateByWeek, getPrivateDashbordInfo } from '../controllers/weeksController.js';
import { currentWeekSchema } from '../validations/weeksValidation.js';

const router = Router();

router.get('/api/weeks', getPrivateDashbordInfo);
router.get('/api/weeks/:currentWeek',celebrate(currentWeekSchema),getBabyStateByWeek);
export default router;
