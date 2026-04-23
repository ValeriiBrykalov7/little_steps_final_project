import { Joi, celebrate } from 'celebrate';

export const validateTask = celebrate({
  body: Joi.object({
    title: Joi.string().required().trim().min(1).max(96),
    date: Joi.string().required(),
    isDone: Joi.boolean(),
  }),
});
