import Joi from 'joi';

import * as fields from '../joi';

export const createOrUpdateComment = (req, res, next) => {
  const commentSchema = Joi.object().keys({
    text: fields.commentText.required()
  });

  const result = Joi.validate(req.body, commentSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};
