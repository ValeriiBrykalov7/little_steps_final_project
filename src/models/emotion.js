import { Schema, model } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const Emotion = model('Emotion', emotionSchema);
