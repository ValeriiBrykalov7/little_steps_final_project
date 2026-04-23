import { Schema, model } from 'mongoose';
import { getCurrentDate } from '../utilse/date';

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
    date: {
      type: String,
      default: getCurrentDate,
    },
    emotions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Emotion',
        required: true,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Diary = model('Diary', diarySchema);
