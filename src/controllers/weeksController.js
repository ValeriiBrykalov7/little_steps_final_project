// WeeksController
import createHttpError from 'http-errors';
import { MomState } from '../models/momState.js';

//mumStateByWeek
export const getMumStateByWeek = async (req, res) => {
  const { weekNumber } = req.params;

  const data = await MomState.findOne({ weekNumber: Number(weekNumber) });
  if (!data) {
    createHttpError(404, 'Тиждень не знайдено');
  }

  res.status(200).json({
    status: 200,
    message: 'Дані отримано успішно',
    data,
  });
};
