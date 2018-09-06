import Joi from 'joi';

import * as fields from '../joi';

export const createRoom = (req, res, next) => {
  const newRoomSchema = Joi.object().keys({
    title: fields.roomTitle.required(),
    creator: fields.creator
  });

  const result = Joi.validate(req.body, newRoomSchema, fields.config);
  result.error ? next({ status: 400, ...result.error }) : next();
};
