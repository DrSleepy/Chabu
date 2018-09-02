import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(5)
  .max(30);

export default username;
