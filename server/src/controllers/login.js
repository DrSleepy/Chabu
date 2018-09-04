import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';
import AccountModel from '../models/Account';

export const login = async (req, res) => {
  const response = { ok: false, errors: [] };

  // check if account exists
  const bodyUsername = new RegExp(req.body.username, 'i');
  const account = await AccountModel.findOne({ username: bodyUsername });

  if (!account) {
    response.errors.push({ path: ['username'], message: 'Username is not registered' });
    res.status(404).json(response);
    return;
  }

  // validate password
  const validPassword = account.isValidPassword(req.body.password, account.password);
  if (!validPassword) {
    response.errors.push({ path: ['password'], message: 'Incorrect password' });
    res.status(401).json(response);
    return;
  }

  const token = await signToken(account);
  res.cookie('token', token, { httpOnly: true, secure: SECURE_COOKIES });

  response.ok = true;
  res.status(200).json(response);
};
