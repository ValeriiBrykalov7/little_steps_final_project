import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const updateUserValidation = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().trim().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    gender: Joi.string().valid(...GENDERS),
    dueDate: Joi.string().isoDate(),
  }),
}
