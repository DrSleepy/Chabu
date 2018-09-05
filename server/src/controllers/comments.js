import CommentModel from '../models/Comment';
import AccountModel from '../models/Account';

export const createComment = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);

  const newComment = await new CommentModel({
    account: req.accountID,
    showUsername: account.showUsername,
    ...req.body
  }).save();

  await account.update({ $push: { createdComments: newComment._id } });

  response.ok = true;
  res.status(200).json(response);
};

export const deleteComment = (req, res) => {
  res.status(200).json({
    message: 'Validated and deleting specific account..'
  });
};

export const updateComment = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  await CommentModel.findByIdAndUpdate(req.params.id, { ...req.body });

  response.ok = true;
  res.status(200).json(response);
};
