import { model, Schema } from 'mongoose';
import { GENDERS } from '../constants/genders.js';
import { getDateInFortyWeeks } from '../utils/date.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 32,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxLength: 64,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 128,
    },
    gender: {
      type: String,
      enum: GENDERS,
      default: 'null',
      required: false,
    },
    dueDate: {
      type: String,
      default: getDateInFortyWeeks,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    theme: {
      type: String,
      enum: ['boy', 'girl', 'neutral'],
      default: 'neutral',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
