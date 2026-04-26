import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required().messages({
      'string.base': 'Name must be a string',
      'string.max': 'Name must be at most 32 characters long',
      'any.required': 'Name is required',
    }),

    email: Joi.string().email().max(64).required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'string.max': 'Email must be at most 64 characters long',
      'any.required': 'Email is required',
    }),

    password: Joi.string().min(8).max(128).required().messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be at most 128 characters long',
      'any.required': 'Password is required',
    }),
  }),
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),

    password: Joi.string().required().messages({
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
  }),
};
