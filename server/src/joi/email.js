import Joi from 'joi';

const email = Joi.string().email();

export default email;
