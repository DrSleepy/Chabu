import Joi from 'joi';

import * as fields from '../joi';

export const login = (req, res, next) => {
  const loginSchema = Joi.object().keys({
    username: fields.username.required(),
    password: fields.password.required()
  });

  const result = Joi.validate(req.body, loginSchema, fields.config);
  result.error ? res.status(400).json(result.error) : next();
};
