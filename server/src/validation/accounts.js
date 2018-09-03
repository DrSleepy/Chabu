import Joi from 'joi';

import * as fields from '../joi';

// functions flow:
// 1. create schema to validate against body
// 2. run schema against body
// 3. return error if schema fails or call next() if success

export const createAccount = (req, res, next) => {
  const newAccountSchema = Joi.object().keys({
    username: fields.username.required(),
    password: fields.password.required(),
    passwordConfirm: fields.passwordConfirm.required()
  });

  const result = Joi.validate(req.body, newAccountSchema, fields.config);
  result.error ? res.status(400).json(result.error) : next();
};

export const updateAccount = (req, res, next) => {
  const updateAccountSchema = Joi.object().keys({
    email: fields.email,
    showUsername: fields.showUsername
  });

  const result = Joi.validate(req.body, updateAccountSchema, fields.config);
  result.error ? res.status(400).json(result.error) : next();
};
