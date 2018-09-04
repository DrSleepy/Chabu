import Joi from 'joi';

export const paramValidation = (name, schema) => (req, res, next) => {
  const param = req.params[name];
  const result = Joi.validate(param, schema);
  result.error ? res.status(400).json(result.error) : next();
};
