const comments = {
  createComment: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and creating comment..'
    });
    next();
  },
  deleteComment: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and deleting specific account..'
    });
    next();
  },
  updateComment: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating specific account..'
    });
    next();
  }
};

export default comments;
