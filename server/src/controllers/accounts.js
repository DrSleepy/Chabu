import JWT from 'jsonwebtoken';
import shortid from 'shortid';

import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { COMPANY, JWT_SECRET_EMAIL, SECURE_COOKIES, SERVER_URL, JWT_SECRET_PASSWORD } from '../config';
import { mailer } from '../helpers/mailer';
import { verifyEmailTemplate, resetPasswordTemplate } from '../helpers/emailRenders';

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
  const token = signToken(newAccount);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  response.ok = true;
  res.status(200).json(response);
};

export const getAccount = async (req, res) => {
  res.status(200).json({ ok: true, errors: [], data: req.account });
};

export const updateAccount = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  await req.account.update(req.body);

  response.ok = true;
  res.status(200).json(response);
};

export const getList = (model, list) => async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const result = await model.find({ _id: { $in: req.account[list] } });

  response.ok = true;
  response.data = result;
  res.status(200).json(response);
};

export const sendEmailVerification = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  if (req.account.email) {
    response.errors.push({ path: ['email'], message: 'Account is already linked to an email' });
    next({ status: 400, ...response });
    return;
  }

  const email = new RegExp(req.body.email, 'i');
  const account = await AccountModel.findOne({ email });

  if (account) {
    response.errors.push({ path: ['account'], message: 'Email is already registered to an account' });
    next({ status: 400, ...response });
    return;
  }

  const payload = { accountID: req.account._id, email: req.body.email };
  const options = { expiresIn: '1h' };

  const token = JWT.sign(payload, JWT_SECRET_EMAIL, options);
  const emailPayload = {
    username: req.account.username,
    tokenLink: `${SERVER_URL}/accounts/verify/${token}`,
    company: COMPANY
  };

  try {
    await mailer('test.askit@hotmail.com', req.body.email, 'Email Verification', verifyEmailTemplate(emailPayload));
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
    decoded = await JWT.verify(req.params.token, JWT_SECRET_EMAIL);
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

  if (account.email) {
    response.errors.push({ path: ['email'], message: 'Account already linked to an email' });
    next({ status: 409, ...response });
    return;
  }

  await account.update({ email: decoded.email });

  response.ok = true;
  res.status(200).json(response);
};

export const resetPassword = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const resetToken = shortid.generate();

  const email = new RegExp(`^${req.body.email}$`, 'i');
  const account = await AccountModel.findOne({ email });

  if (!account) {
    response.errors.push({ path: ['account'], message: 'No account linked to provided email' });
    next({ status: 404, ...response });
    return;
  }

  const token = JWT.sign({ resetToken }, JWT_SECRET_PASSWORD, { expiresIn: '1h' });

  const emailPayload = {
    username: account.username,
    tokenLink: `${SERVER_URL}/accounts/reset/${token}`,
    company: COMPANY
  };

  try {
    const mailed = mailer('test.askit@hotmail.com', req.body.email, 'Password Reset', resetPasswordTemplate(emailPayload));
    const updateAccountResult = account.update({ resetToken }).exec();
    await Promise.all([mailed, updateAccountResult]);
  } catch (error) {
    next({ status: 500, message: 'Failed to send email', error });
    return;
  }

  response.ok = true;
  res.status(200).json(response);
};

export const resetPasswordVerify = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  let decoded;
  try {
    decoded = await JWT.verify(req.params.token, JWT_SECRET_PASSWORD);
  } catch (error) {
    next({ status: 401, message: 'Invalid token', error });
  }

  const account = await AccountModel.findOne({ resetToken: decoded.resetToken });
  if (!account) {
    response.errors.push({ path: ['token'], message: 'Token no longer valid' });
    next({ status: 400, ...response });
    return;
  }

  const hashPassword = account.encryptPassword(req.body.password);
  await account.update({ password: hashPassword, resetToken: null });

  response.ok = true;
  res.status(200).json(response);
};
