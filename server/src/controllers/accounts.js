export const createAccount = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and creating new account..'
  });
  next();
};

export const getAccount = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and getting specific account..'
  });
  next();
};

export const updateAccount = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and updating specific account..'
  });
  next();
};
