// DiariesValidation
import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title must not exceed 64 characters',
      'any.required': 'Title is required',
    }),
    description: Joi.string().min(1).max(1000).required().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 1 character long',
      'string.max': 'Description must not exceed 1000 characters',
      'any.required': 'Description is required',
    }),
    emotions: Joi.array()
      .items(
        Joi.string().custom(objectIdValidator).required().messages({
          'string.base': 'Emotion must be a string',
          'any.required': 'Emotion is required',
          'any.custom': 'Emotion must be a valid ObjectId',
        }),
      )
      .min(1)
      .max(12)
      .required()
      .messages({
        'array.base': 'Emotions must be an array',
        'array.min': 'At least one emotion is required',
        'array.max': 'No more than 12 emotions allowed',
        'any.required': 'Emotions are required',
      }),
  }),
};

export const deleteDiarySchema = {
  [Segments.PARAMS]: Joi.object({
    entryId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'Diary id must be a string',
      'any.required': 'Diary id is required',
      'any.custom': 'Invalid diary id format',
    }),
  }),
};

export const updateDiarySchema = {
  [Segments.PARAMS]: Joi.object({
    entryId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'Diary id must be a string',
      'any.required': 'Diary id is required',
      'any.custom': 'Invalid diary id format',
    }),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title must not exceed 64 characters',
    }),

    description: Joi.string().min(1).max(1000).messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 1 character long',
      'string.max': 'Description must not exceed 1000 characters',
    }),

    emotions: Joi.array()
      .items(
        Joi.string().custom(objectIdValidator).messages({
          'string.base': 'Emotion must be a string',
          'any.custom': 'Emotion must be a valid ObjectId',
        }),
      )
      .min(1)
      .max(12)
      .messages({
        'array.base': 'Emotions must be an array',
        'array.min': 'At least one emotion is required',
        'array.max': 'No more than 12 emotions allowed',
      }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update',
    }),
};
