import { Joi, Segments } from 'celebrate';

export const getCurrentUserSchema = {
  [Segments.BODY]: Joi.object({}).messages({
    'object.base': 'Request body must be an object',
  }),
};
