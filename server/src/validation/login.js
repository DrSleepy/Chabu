import Joi from 'joi';

import * as fields from '../joi';

export const login = (req, res, next) => {
  const authenticateSchema = Joi.object().keys({
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  });

  const result = Joi.validate(req.body, authenticateSchema, fields.config);
  result.error ? next({ status: 400, ...result.error }) : next();
};
