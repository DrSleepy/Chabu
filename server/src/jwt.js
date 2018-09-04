import JWT from 'jsonwebtoken';

import { JWT_SECRET } from './config';

export const signToken = account => {
  const payload = { accountID: account._id };
  const options = { expiresIn: '1h' };

  return JWT.sign(payload, JWT_SECRET, options);
};

export const verifyToken = async (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    req.accountID = null;
    next();
    return;
  }

  const { token } = req.cookies;

  try {
    const decoded = await JWT.verify(token, JWT_SECRET);
    req.accountID = decoded.accountID;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
