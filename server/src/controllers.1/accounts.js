import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';

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
