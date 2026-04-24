// WeeksController
import createHttpError from 'http-errors';
import { MomState } from '../models/momState.js';

//mumStateByWeek
export const getMumStateByWeek = async (req, res) => {
  const { weekNumber } = req.params;

  const data = await MomState.findOne({ weekNumber: Number(weekNumber) });
  if (!data) {
    throw createHttpError(404, 'Week was not found');
  }

  res.status(200).json({
    message: 'Data retrieved successfully',
    data,
  });
};
