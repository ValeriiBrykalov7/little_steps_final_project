import { Schema, model } from 'mongoose';
import { getCurrentDate } from '../utils/date';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 96,
    },
    date: {
      type: String,
      required: true,
      default: getCurrentDate,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Task = model('Task', taskSchema);
