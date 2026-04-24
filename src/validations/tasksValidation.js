import { Joi, Segments } from 'celebrate';
import { validateNotPastDate } from '../utils/validators.js';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(96).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must contain at least 1 character',
      'string.max': 'Name cannot be longer than 96 characters',
      'any.required': 'Name is required',
    }),

    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .custom(validateNotPastDate)
      .messages({
        'string.base': 'Date must be a string',
        'string.empty': 'Date cannot be empty',
        'string.pattern.base': 'Date must be in format YYYY-MM-DD',
        'any.required': 'Date is required',
        'date.min': 'Date cannot be earlier than today',
      }),

    isDone: Joi.boolean().default(false).messages({
      'boolean.base': 'isDone must be a boolean value',
    }),
  }),
};
export const updateTaskStatusSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().hex().length(24).required().messages({
      'string.base': 'Task ID must be a string',
      'string.empty': 'Task ID cannot be empty',
      'string.hex': 'Task ID must contain only hexadecimal characters',
      'string.length': 'Task ID must be exactly 24 characters long',
      'any.required': 'Task ID is required',
    }),
  }),
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required().messages({
      'boolean.base': 'Field "isDone" must be a boolean',
      'any.required': 'Field "isDone" is required',
    }),
  }),
};
