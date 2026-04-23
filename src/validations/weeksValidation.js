// WeeksValidation
import { Joi, Segments } from 'celebrate';

export const weekParamSchema = {
  [Segments.PARAMS]: Joi.object({
    weekNumber: Joi.number().min(1).required(),
  }),
};
