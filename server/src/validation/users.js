import Joi from 'joi';

import * as fields from '../joi';

export const createUser = (req, res, next) => {
  // expected schema
  const newUserSchema = Joi.object().keys({
    email: fields.email.required(),
    password: fields.password.required(),
    username: fields.username.required()
  });

  const result = Joi.validate(req.body, newUserSchema);
  result.error ? res.status(400).json(result.error) : next();
  // Passing schema validation MUST return next() to continue to next middleware
};

export const updateUser = (req, res, next) => {
  const updateUser = Joi.object().keys({
    email: fields.email,
    password: fields.password,
    username: fields.username
  });

  const result = Joi.validate(req.body, updateUser);
  result.error ? res.status(400).json(result.error) : next();
};
