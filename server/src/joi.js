import Joi from 'joi';
import { forbiddenUsernames } from './helpers/forbiddenUsernames';

export const config = {
  escapeHtml: true,
  abortEarly: false,
  language: {
    key: '{{label}} ',
    any: {
      required: 'is required',
      empty: 'is required'
    }
  }
};

export const username = Joi.string()
  .min(4)
  .max(20)
  .alphanum()
  .insensitive()
  .invalid(forbiddenUsernames)
  .label('Username');

export const password = Joi.string()
  .alphanum()
  .min(8)
  .max(100)
  .label('Password');

export const passwordConfirm = Joi.any()
  .valid(Joi.ref('password'))
  .options({
    language: {
      any: {
        allowOnly: 'does not match password'
      }
    }
  })
  .label('Password Confirmation');

export const email = Joi.string()
  .email({ minDomainAtoms: 2 })
  .lowercase()
  .min(4)
  .max(40)
  .label('Email');

export const creator = Joi.string()
  .alphanum()
  .allow('')
  .max(15)
  .label('Creator');

export const uuid = Joi.string()
  .required()
  .min(7)
  .max(14)
  .label('Room ID');

export const roomTitle = Joi.string()
  .min(5)
  .max(40)
  .label('Room Title');

export const questionTitle = Joi.string()
  .min(20)
  .max(100)
  .label('Question Title');

export const questionText = Joi.string()
  .max(20000)
  .allow('')
  .label('Question Text');

export const commentText = Joi.string()
  .min(1)
  .max(20000)
  .label('Comment Text');

export const showUsername = Joi.boolean().label('Show Username');

export const locked = Joi.boolean().label('Locked');
