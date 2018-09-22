import Joi from 'joi';

import * as fields from '../joi';

export const createQuestion = (req, res, next) => {
  const newQuestionSchema = Joi.object().keys({
    title: fields.questionTitle.required(),
    text: fields.questionText
  });

  const result = Joi.validate(req.body, newQuestionSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const updateQuestion = (req, res, next) => {
  const updateQuestionSchema = Joi.object().keys({
    text: fields.questionText.required()
  });

  const result = Joi.validate(req.body, updateQuestionSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};
