import Joi from 'joi';

import email from './field-schemas/email';
import username from './field-schemas/username';
import password from './field-schemas/password';

export default {
  addNewUser: (req, res, next) => {
    // expected schema
    const newUserSchema = Joi.object().keys({
      email: email.required(),
      password: password.required(),
      username: username.required()
    });

    const result = Joi.validate(req.body, newUserSchema);
    result.error ? res.status(400).json(result.error) : next();
    // Passing schema validation MUST return next() to continue to next middleware
  },
  updateUser: (req, res, next) => {
    const updateUser = Joi.object().keys({
      email,
      password,
      username
    });

    const result = Joi.validate(req.body, updateUser);
    result.error ? res.status(400).json(result.error) : next();
  }
};
