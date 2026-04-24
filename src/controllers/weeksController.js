import createHttpError from 'http-errors';
import {
  calculateWeek,
  calculateDays,
  calculateDayInWeek,
} from '../utils/pregnancy.js';
import { BabyState } from '../models/babyState.js';
import { MomState } from '../models/momState.js';

export const getPrivateDashbordInfo = async (req, res) => {
  const user = req.user;
  if (!user.dueDate) {
    throw createHttpError(400, 'User dueDate is required');
  }

  const week = calculateWeek(user.dueDate);
  const days = calculateDays(user.dueDate, week);
  const dayIndex = calculateDayInWeek(user.dueDate);

  const babyState = await BabyState.findOne({ weekNumber: week });

  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const tipOfTheDay =
    babyState.momDailyTips[adjustedIndex] || babyState.momDailyTips[0];
  res.status(200).json({
    currentWeek: week,
    daysToMeeting: days,
    baby: {
      analogy: babyState.analogy,
      size: babyState.babySize,
      weight: babyState.babyWeight,
      image: babyState.image,
      description: babyState.babyDevelopment,
      interestingFact: babyState.interestingFact,
    },
    dailyAdvice: tipOfTheDay,
  });
};

export const getBabyStateByWeek = async (req, res) => {
  const { weekNumber } = req.params;

  const data = await BabyState.findOne({
    weekNumber,
  });
  if (!data) {
    throw createHttpError(404, 'Week was not found');
  }

  res.status(200).json(data);
};

//mumStateByWeek
export const getMumStateByWeek = async (req, res) => {
  const { weekNumber } = req.params;

  const data = await MomState.findOne({ weekNumber: Number(weekNumber) });
  if (!data) {
    throw createHttpError(404, 'Week was not found');
  }

  res.status(200).json(data);
};
