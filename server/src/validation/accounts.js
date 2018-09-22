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
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const updateAccount = (req, res, next) => {
  const updateAccountSchema = Joi.object().keys({
    showUsername: fields.showUsername
  });

  const result = Joi.validate(req.body, updateAccountSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const verifyEmail = (req, res, next) => {
  const verifyEmailSchema = Joi.object().keys({
    email: fields.email.required()
  });

  const result = Joi.validate(req.body, verifyEmailSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const resetPassword = (req, res, next) => {
  const resetPasswordSchema = Joi.object().keys({
    email: fields.email.required()
  });

  const result = Joi.validate(req.body, resetPasswordSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const resetPasswordVerify = (req, res, next) => {
  const resetPasswordVerifySchema = Joi.object().keys({
    password: fields.password.required(),
    passwordConfirm: fields.passwordConfirm.required()
  });

  const result = Joi.validate(req.body, resetPasswordVerifySchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};
