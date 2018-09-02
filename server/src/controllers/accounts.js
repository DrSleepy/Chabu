const accounts = {
  createAccount: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and creating new account..'
    });
    next();
  },
  getAccount: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting specific account..'
    });
    next();
  },
  updateAccount: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating specific account..'
    });
    next();
  }
};

export default accounts;
