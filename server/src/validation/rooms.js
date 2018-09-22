import Joi from 'joi';

import * as fields from '../joi';

export const createRoom = (req, res, next) => {
  const newRoomSchema = Joi.object().keys({
    title: fields.roomTitle.required(),
    creator: fields.creator
  });

  const result = Joi.validate(req.body, newRoomSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};

export const updateRoom = (req, res, next) => {
  const updateRoomSchema = Joi.object().keys({
    title: fields.roomTitle,
    creator: fields.creator,
    unlocked: fields.unlocked
  });

  const result = Joi.validate(req.body, updateRoomSchema, fields.config);
  result.error ? next({ status: 400, errors: [...result.error.details] }) : next();
};
