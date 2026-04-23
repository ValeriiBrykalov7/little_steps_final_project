import { Joi, Segments } from 'celebrate';

export const weekParamSchema = {
  [Segments.PARAMS]: Joi.object({
    weekNumber: Joi.number().integer().min(1).required().messages({
      'number.base': 'Week number must be a number',
      'number.integer': 'Week number must be an integer',
      'number.min': 'Week number must be at least 1',
      'any.required': 'Week number is required',
    }),
  }),
};
