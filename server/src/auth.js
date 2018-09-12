export const isLoggedIn = (req, res, next) => {
  !req.account ? next({ status: 401, message: 'Must be logged in' }) : next();
  return req.account;
};

export const authorization = (id, model) => async (req, res, next) => {
  const resource = await model.findById(req.params[id]);

  if (!resource) {
    next({ status: 404, message: 'Resource not found' });
    return;
  }

  // deal with own resources
  if (resource.account && req.account._id === resource.account) {
    next();
    return;
  }

  next({ status: 403, message: 'Access forbidden' });
};
