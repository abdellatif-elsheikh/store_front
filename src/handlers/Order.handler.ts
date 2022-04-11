import Joi from 'joi';

export const schema = Joi.object({
  status: Joi.string().trim().required().valid('active', 'complete'),
  user_id: Joi.string().required().exist(),
});
