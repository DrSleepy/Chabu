import Joi from 'joi';

export default Joi.string()
  .min(8)
  .max(30);
