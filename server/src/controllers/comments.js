export const createComment = (req, res) => {
  res.status(200).json({
    message: 'Validated and creating comment..'
  });
};

export const deleteComment = (req, res) => {
  res.status(200).json({
    message: 'Validated and deleting specific account..'
  });
};

export const updateComment = (req, res) => {
  res.status(200).json({
    message: 'Validated and updating specific account..'
  });
};
