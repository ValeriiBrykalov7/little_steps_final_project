import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const updateUserValidation = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().trim().min(1).max(30).messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must be at least 1 character long',
      'string.max': 'Username must be at most 30 characters long',
    }),
    email: Joi.string().email().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(8).messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 8 characters long',
    }),
    gender: Joi.string().valid(...GENDERS).messages({
      'string.base': 'Gender must be a string',
      'any.only': 'Gender must be one of the allowed values',
    }),
    dueDate: Joi.string().isoDate().messages({
      'string.base': 'Due date must be a string',
      'date.format': 'Due date must be a valid date',
    }),
  }),
}
