import Joi from 'joi';

export const config = {
  escapeHtml: true,
  abortEarly: false,
  language: {
    key: '{{label}} ',
    any: {
      empty: 'is required'
    }
  }
};

export const username = Joi.string()
  .min(4)
  .max(20)
  .alphanum()
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
  .min(3)
  .max(20)
  .label('Creator');

export const mongoID = Joi.string()
  .length(24)
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .label('MongoID');

export const roomTitle = Joi.string()
  .min(5)
  .max(100)
  .label('Room Title');

export const questionTitle = Joi.string()
  .min(20)
  .max(200)
  .label('Question Title');

export const questionText = Joi.string()
  .min(5)
  .max(20000)
  .label('Question Text');

export const commentText = Joi.string()
  .min(1)
  .max(20000)
  .label('Comment Text');

export const showUsername = Joi.boolean().label('Show Username');

export const unlocked = Joi.boolean().label('Unlocked');
