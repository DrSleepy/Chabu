import Joi from 'joi';

export const config = {
  escapeHtml: true,
  stripUnknown: true,
  abortEarly: false,
  language: {
    key: '{{label}} ',
    any: {
      empty: 'is required'
    }
  }
};

export const username = Joi.label('Username')
  .string()
  .alphanum()
  .min(4)
  .max(20);

export const password = Joi.label('Password')
  .string()
  .alphanum()
  .min(8)
  .max(30);

export const passwordConfirm = Joi.label('Password Confirmation')
  .any()
  .valid(Joi.ref('password'))
  .options({
    language: {
      any: {
        allowOnly: 'does not match password'
      }
    }
  });

export const email = Joi.label('Email')
  .email()
  .lowercase()
  .min(4)
  .max(40);

export const creator = Joi.label('Creator')
  .string()
  .alphanum()
  .min(3)
  .max(20);

export const mongoId = Joi.label('MongoID')
  .string()
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .min(24)
  .max(24);

export const roomTitle = Joi.label('Room Title')
  .string()
  .alphanum()
  .min(5)
  .max(100);

export const questionTitle = Joi.label('Question Title')
  .string()
  .min(20)
  .max(200);

export const questionText = Joi.label('Question Text')
  .string()
  .min(5)
  .max(20000);

export const commentText = Joi.label('Comment Text')
  .string()
  .min(1)
  .max(20000);

export const showUsername = Joi.label('Show Username').boolean();

export const unlocked = Joi.label('Unlocked').boolean();
