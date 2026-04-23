import { Schema, model } from 'mongoose';

const momStateSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    feelings: {
      states: { type: [String], required: true },
      sensationDescr: { type: String, required: true, maxLength: 1000 },
    },
    comfortTips: [
      {
        category: { type: String, required: true },
        tip: { type: String, required: true },
      },
    ],
  },
  {
    collection: 'mom_states',
    versionKey: false,
    timestamps: true,
  },
);

export const MomState = model('MomState', momStateSchema);
