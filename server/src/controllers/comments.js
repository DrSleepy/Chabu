import CommentModel from '../models/Comment';

export const createComment = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  console.log('YASSSS');

  // code here
  const x = await new CommentModel({ account: req.accountID, ...req.body }).save();
  const e = await CommentModel.findById(x._id).populate('account');
  console.log(e);

  response.ok = true;
  res.status(200).json(response);
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
