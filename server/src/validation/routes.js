import Joi from 'joi';
import mongoId from './field-schemas/mongoId';

export default {
  mongoId: name => {
    return (req, res, next) => {
      const id = req.params[name];
      const result = Joi.validate(id, mongoId);
      result.error ? res.status(400).json(result.error) : next();
    };
  }
};
