import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';
import AccountModel from '../models/Account';

export const login = async (req, res) => {
  const badResponse = { ok: false, errors: [], account: null };

  // check if account exists
  const account = await AccountModel.findOne({ username: req.body.username });
  if (!account) {
    badResponse.errors.push({ path: ['username'], message: 'Username is not registered' });
    res.status(404).json(badResponse);
    return;
  }

  // validate password
  const validPassword = account.comparePassword(req.body.password, account.password);
  if (!validPassword) {
    badResponse.errors.push({ path: ['password'], message: 'Incorrect password' });
    res.status(401).json(badResponse);
    return;
  }

  const token = await signToken(account);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  const goodResponse = { ok: true, errors: [], account: null };
  res.status(200).json(goodResponse);
};
