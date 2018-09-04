export const authorization = (id, model) => (req, res, next) => {
  // not logged in
  if (!req.accountID) {
    res.sendStatus(403);
    return;
  }

  const result = model.findOne({ _id: req.param[id] });

  // does resource belong to logged in user
  result.account._id !== req.accountID ? res.sendStatus(403) : next();
};
