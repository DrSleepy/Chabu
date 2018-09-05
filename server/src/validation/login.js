import Joi from 'joi';

import * as fields from '../joi';

export const login = (req, res, next) => {
  const authenticateSchema = Joi.object().keys({
    username: fields.username.required(),
    password: fields.password.required()
  });

  const result = Joi.validate(req.body, authenticateSchema, fields.config);
  result.error ? next({ status: 400, ...result.error }) : next();
};
