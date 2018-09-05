import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';

export const createAccount = async (req, res) => {
  const response = { ok: false, errors: [] };

  // check if username exists
  const bodyUsername = new RegExp(req.body.username, 'i');
  const account = await AccountModel.findOne({ username: bodyUsername }).select('username');

  if (account) {
    response.errors.push({ path: ['username'], message: 'Username is already registered' });
    res.status(400).json(response);
    return;
  }

  const newAccount = await new AccountModel(req.body).save();

  // create and set jwt
  const token = await signToken(newAccount);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  response.ok = true;
  res.status(200).json(response);
};

export const getAccount = (req, res) => {
  res.status(200).json({
    message: 'Validated and getting specific account..'
  });
};

export const updateAccount = async (req, res) => {
  const response = { ok: false, errors: [] };

  await AccountModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });

  response.ok = true;
  res.status(200).json(response);
};
