import Joi from 'joi';

const password = Joi.string()
  .min(8)
  .max(30);

export default password;
