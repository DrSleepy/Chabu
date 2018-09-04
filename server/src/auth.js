export const auth = (model, id) => (req, res, next) => {
  if (!req.accountID) {
    res.sendStatus(403);
    return;
  }

  const result = model.findOne({ _id: req.param[id] });

  result.account._id !== req.accountID ? res.sendStatus(403) : next();
};
