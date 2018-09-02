import Joi from 'joi';

const mongoId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .min(24)
  .max(24);

export default mongoId;
