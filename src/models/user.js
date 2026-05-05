import { model, Schema } from 'mongoose';
import { GENDERS } from '../constants/genders.js';
import { getDateInFortyWeeks } from '../utils/date.js';

const userSchema = new Schema(
  {
    username: {
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
      required: function () {
        return this.provider === 'local';
      },
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
      enum: ['boy', 'girl', 'null'],
      default: 'null',
      required: true,
    },
    pendingEmail: { type: String, default: null },
    verifyEmailToken: { type: String, default: null },
    verifyEmailExpires: { type: Date, default: null },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
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
