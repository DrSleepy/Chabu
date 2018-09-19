import AccountModel from '../models/Account';
import { signToken } from '../jwt';
import { SECURE_COOKIES } from '../config';

export const login = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  // check if account exists
  const bodyUsername = new RegExp(`^${req.body.username}$`, 'i');
  const account = await AccountModel.findOne({ username: bodyUsername });

  if (!account) {
    response.errors.push({ path: ['username'], message: 'Username is not registered' });
    next({ status: 404, ...response });
    return;
  }

  // validate password
  const validPassword = account.isValidPassword(req.body.password, account.password);
  if (!validPassword) {
    response.errors.push({ path: ['password'], message: 'Incorrect password' });
    next({ status: 401, ...response });
    return;
  }

  // successful login should nullify resetToken if user previously clicked 'forgot password'
  if (account.resetToken) {
    await account.update({ resetToken: null });
  }

  const token = signToken(account);
  res.cookie('token', token, { httpOnly: false, secure: SECURE_COOKIES });

  response.ok = true;
  res.status(200).json(response);
};
