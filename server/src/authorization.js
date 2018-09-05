export const authorization = (id, model) => async (req, res, next) => {
  // forbid - not logged in
  if (!req.accountID) {
    res.sendStatus(403);
    return;
  }

  const result = await model.findById({ _id: req.params[id] });

  if (!result) {
    res.sendStatus(404);
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

  res.sendStatus(403);
};
