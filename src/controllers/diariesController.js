// DiariesController
import { Diary } from '../models/diary.js';
import '../models/emotion.js';
import { Emotion } from '../models/emotion.js';

export const getAllDiary = async (req, res) => {
  const diary = await Diary.find({ userId: req.user._id }).populate(
    'emotions',
    'title',
  );
  const allEmotions = await Emotion.find();
  res.status(200).json({ diary, allEmotions });
};

export const createDiary = async (req, res) => {
  const diary = await Diary.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(diary);
};
