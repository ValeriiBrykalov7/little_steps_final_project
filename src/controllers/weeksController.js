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

  const tipOfTheDay =
    babyState.momDailyTips[dayIndex] || babyState.momDailyTips[0];
  res.status(200).json({
    currentWeek: week,
    daysToMeeting: days,
    momDailyTips: babyState.momDailyTips,
    baby: {
      analogy: babyState.analogy,
      size: babyState.babySize,
      weight: babyState.babyWeight,
      image: babyState.image,
      activity: babyState.babyActivity,
      description: babyState.babyDevelopment,
      interestingFact: babyState.interestingFact,
    },
    dailyAdvice: tipOfTheDay,
  });
};

export const getPublicDashbordInfo = async (req, res) => {
  const baby = await BabyState.findOne({ weekNumber: 1 });

  if (!baby) {
    return res.status(404).json({
      message: 'Data not found for this week',
    });
  }
  return res.status(200).json({
    currentWeek: baby.weekNumber,
    daysToMeeting: 280,
    momDailyTips: baby.momDailyTips,
    baby: {
      analogy: baby.analogy,
      size: baby.babySize,
      weight: baby.babyWeight,
      image: baby.image,
      activity: baby.babyActivity,
      description: baby.babyDevelopment,
      interestingFact: baby.interestingFact,
    },
    dailyAdvice:
      'Якщо ви плануєте вагітність, почніть приймати фолієву кислоту (400 мкг щодня) для профілактики вад нервової трубки у плода.',
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
