// DiariesController
import { Diary } from '../models/diary.js';
import '../models/emotion.js';
import createHttpError from 'http-errors';

export const getAllDiary = async (req, res) => {
  const diary = await Diary.find({ userId: req.user._id }).populate(
    'emotions',
    'title',
  );
  res.status(200).json(diary);
};

export const createDiary = async (req, res) => {
  const diary = await Diary.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(diary);
};

export const updateDiary = async (req, res) => {
  const { entryId } = req.params;
  const updates = req.body;
  const updateDiary = await Diary.findOneAndUpdate(
    { _id: entryId, userId: req.user._id },
    updates,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );
  if (!updateDiary) {
    throw createHttpError(404, 'Diary not found');
  }
  res.status(200).json(updateDiary);
};

export const deleteDiary = async (req, res) => {
  const { entryId } = req.params;
  const deleteDiary = await Diary.findOneAndDelete({
    _id: entryId,
    userId: req.user._id,
  });
  if (!deleteDiary) {
    throw createHttpError(404, 'Diary not found');
  }
  res.status(200).json(deleteDiary);
};
