import JWT from 'jsonwebtoken';

import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { JWT_SECRET, SECURE_COOKIES } from '../config';
import { mailer } from '../helpers/mailer';
import { renderEmailTemplate } from '../helpers/emailTemplate';

export const createAccount = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  // check if username exists
  const username = new RegExp(req.body.username, 'i');
  const account = await AccountModel.findOne({ username }).select('username');

  if (account) {
    response.errors.push({ path: ['username'], message: 'Username is taken' });
    next({ status: 400, ...response });
    return;
  }

  const newAccount = await new AccountModel(req.body).save();

  // create and set jwt
  const token = await signToken(newAccount);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  response.ok = true;
  res.status(200).json(response);
};

export const getAccount = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.params.accountID).select('-password');

  response.ok = true;
  response.data = account;
  res.status(200).json(response);
};

export const updateAccount = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  await AccountModel.findByIdAndUpdate(req.params.accountID, req.body);

  response.ok = true;
  res.status(200).json(response);
};

export const sendEmailVerification = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const email = new RegExp(req.body.email, 'i');
  const account = await AccountModel.findOne({ email });
  if (account) {
    response.errors.push({ path: ['account'], message: 'Email is already registered to an account' });
    next({ status: 400, ...response });
    return;
  }

  const payload = { accountID: req.accountID, email: req.body.email };
  const options = { expiresIn: '1h' };

  const token = await JWT.sign(payload, JWT_SECRET, options);
  const emailPayload = { username: 'Bobby', tokenLink: `localhost:3333/accounts/verify/${token}` };

  try {
    await mailer('test.askit@hotmail.com', req.body.email, 'Email Verification', renderEmailTemplate(emailPayload));
  } catch (error) {
    next({ status: 500, message: 'Failed to send email', error });
    return;
  }

  response.ok = true;
  res.status(200).json(response);
};

export const verifyEmail = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  let decoded;
  try {
    decoded = await JWT.verify(req.params.token, JWT_SECRET);
  } catch (error) {
    next({ status: 401, message: 'Invalid token', error });
    return;
  }

  const account = await AccountModel.findById(decoded.accountID);
  if (!account) {
    response.errors.push({ path: ['account'], message: 'Account not found' });
    next({ status: 404, ...response });
    return;
  }

  await account.update({ email: decoded.email });

  response.ok = true;
  res.status(200).json(response);
};
