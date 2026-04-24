// WeeksController
import createHttpError from 'http-errors';
import { MomState } from '../models/momState.js';
import { BabyState } from '../models/babyState.js';

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

export const unauthorizedUserInfo = async (req, res) => {

  const baby = await BabyState.findOne({ weekNumber: 1 });

  if (!baby) {
    return res.status(404).json({
      message: 'Data not found for this week',
    });
  }
  return res.status(200).json({
    week: baby.weekNumber,
    daysToDelivery: 280,
    momDailyTips: baby.momDailyTips,
    baby: {
      size: baby.babySize,
      weight: baby.babyWeight,
      image: baby.image,
      activity: baby.babyActivity,
      development: baby.babyDevelopment,
    },
  });
};
