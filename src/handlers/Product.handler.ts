import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  price: Joi.number().min(0.1).max(10000).required(),
  category: Joi.string().trim().min(3).max(100),
});
