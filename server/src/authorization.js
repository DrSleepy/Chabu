// export const authorization = (id, model) => async (req, res, next) => {
//   // not logged in
//   if (!req.accountID) {
//     res.sendStatus(403);
//     return;
//   }

//   const result = await model.findById({ _id: req.params[id] });

//   if (!result) {
//     res.sendStatus(404);
//     return;
//   }

//   // updating account
//   if (req.accountID == result._id) {
//     next();
//     return;
//   }

//   console.log('nononononon');

//   // updating resource
//   if (req.accountID == result.account._id) {
//     next();
//     return;
//   }

//   res.sendStatus(403);
// };

export const authorization = (id, model) => async (req, res, next) => {
  // not logged in
  if (!req.accountID) {
    res.sendStatus(403);
    return;
  }

  const result = await model.findById({ _id: req.params[id] });

  if (!result) {
    res.sendStatus(404);
    return;
  }

  // update account
  if (req.accountID == result._id) {
    next();
    return;
  }

  // update resource
  if (result.account && req.accountID == result.account._id) {
    next();
    return;
  }

  res.sendStatus(403);
};
