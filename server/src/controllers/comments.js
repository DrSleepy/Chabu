export const createComment = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and creating comment..'
  });
  next();
};

export const deleteComment = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and deleting specific account..'
  });
  next();
};

export const updateComment = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and updating specific account..'
  });
  next();
};
