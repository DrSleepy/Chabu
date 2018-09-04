import Joi from 'joi';

import * as fields from '../joi';

export const createComment = (req, res, next) => {
  const newCommentSchema = Joi.object().keys({
    text: fields.commentText.required()
  });

  const result = Joi.validate(req.body, newCommentSchema, fields.config);
  result.error ? res.status(400).json(result.error) : next();
};

// export const deleteComment = (req, res, next) => {
//   const updateAccountSchema = Joi.object().keys({
//     email: fields.email,
//     showUsername: fields.showUsername
//   });

//   const result = Joi.validate(req.body, updateAccountSchema, fields.config);
//   result.error ? res.status(400).json(result.error) : next();
// };

// export const updateComment = (req, res, next) => {
//   const updateAccountSchema = Joi.object().keys({
//     email: fields.email,
//     showUsername: fields.showUsername
//   });

//   const result = Joi.validate(req.body, updateAccountSchema, fields.config);
//   result.error ? res.status(400).json(result.error) : next();
// };
