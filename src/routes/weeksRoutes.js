import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getBabyStateByWeek, } from '../controllers/weeksController.js';
import { currentWeekSchema } from '../validations/weeksValidation.js';
const router = Router();


// router.get('/', authenticate ,getPrivateDashboardInfo);
router.get('/:currentWeek',celebrate(currentWeekSchema),getBabyStateByWeek);
export default router;
