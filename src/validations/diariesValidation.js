// DiariesValidation
import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).max(1000).required(),
    emotions: Joi.array()
      .items(Joi.string().custom(objectIdValidator).required())
      .min(1)
      .required(),
  }),
};
