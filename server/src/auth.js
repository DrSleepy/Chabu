export const isLoggedIn = (req, res, next) => {
  !req.accountID ? next({ status: 401, message: 'Must be logged in' }) : next();
  return req.accountID;
};

export const authorization = (id, model) => async (req, res, next) => {
  const result = await model.findById({ _id: req.params[id] });

  if (!result) {
    next({ status: 404, message: 'Resource not found' });
    return;
  }

  // deal with own account
  if (req.accountID == result._id) {
    next();
    return;
  }

  // deal with own resources
  if (result.account && req.accountID == result.account._id) {
    next();
    return;
  }

  next({ status: 403, message: 'Forbidden from accessing this resource' });
};
