import Joi from 'joi';

export default Joi.string()
  .alphanum()
  .min(5)
  .max(30);
