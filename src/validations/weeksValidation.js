import { Joi, Segments } from "celebrate";

export const currentWeekSchema={[Segments.PARAMS]: Joi.object({
  currentWeek: Joi.number().integer().min(1).max(42).required()
})};

