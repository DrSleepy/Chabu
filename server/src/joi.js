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

export const username = Joi.string()
  .alphanum()
  .min(4)
  .max(20);

export const password = Joi.string()
  .alphanum()
  .min(8)
  .max(30);

export const passwordConfirm = Joi.any()
  .valid(Joi.ref('password'))
  .label('Password Confirmation')
  .options({
    language: {
      any: {
        allowOnly: 'does not match password'
      }
    }
  });

export const email = Joi.email()
  .min(4)
  .max(50);

export const creator = Joi.string()
  .alphanum()
  .min(3)
  .max(20);

export const mongoId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .min(24)
  .max(24);

export const roomTitle = Joi.string()
  .alphanum()
  .min(5)
  .max(100);

export const showUsername = Joi.boolean();

export const unlocked = Joi.boolean();
