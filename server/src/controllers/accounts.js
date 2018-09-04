export const createAccount = (req, res) => {
  res.status(200).json({
    message: 'Validated and creating new account..'
  });
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
