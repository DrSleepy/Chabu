import CommentModel from '../models/Comment';
import AccountModel from '../models/Account';

export const createComment = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const newComment = await new CommentModel({ account: req.accountID, ...req.body }).save();
  await AccountModel.findByIdAndUpdate(req.accountID, { $push: { createdComments: newComment._id } });

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
