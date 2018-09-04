import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';

export const createAccount = async (req, res) => {
  const badResponse = { ok: false, errors: [] };

  // check if username exists
  const bodyUsername = new RegExp(req.body.username, 'i');
  const account = await AccountModel.findOne({ username: bodyUsername }).select('username');

  if (account) {
    badResponse.errors.push({ path: ['username'], message: 'Username is already registered' });
    res.status(400).json(badResponse);
    return;
  }

  const newAccount = await new AccountModel(req.body).save();

  // create and set jwt
  const token = await signToken(newAccount);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  const goodResponse = { ok: true, errors: [] };
  res.status(200).json(goodResponse);
};

export const getAccount = (req, res) => {
  res.status(200).json({
    message: 'Validated and getting specific account..'
  });
};

export const updateAccount = (req, res) => {
  res.status(200).json({
    message: 'Validated and updating specific account..'
  });
};
