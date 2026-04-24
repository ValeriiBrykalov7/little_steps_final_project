import { Segments } from 'celebrate';
import Joi from 'joi';

export const updateThemeShema = {
  [Segments.BODY]: Joi.object({
    theme: Joi.string().valid('light', 'dark').required(),
  }),
};
