import JWT from 'jsonwebtoken';

import AccountModel from './models/Account';
import { JWT_SECRET } from './config';

export const signToken = account => {
  const payload = { accountID: account._id };
  const options = { expiresIn: '10h' };

  return JWT.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    req.account = null;
    next();
    return;
  }

  try {
    const decoded = await JWT.verify(req.cookies.token, JWT_SECRET);
    req.account = await AccountModel.findById(decoded.accountID).select('-password');
    next();
  } catch (error) {
    next({ status: 401, message: 'Invalid token', error });
  }
};
