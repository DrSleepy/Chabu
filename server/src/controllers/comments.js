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

export const deleteComment = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  // update instead of delete - need child comments
  await CommentModel.findByIdAndUpdate(req.params.id, { text: null, deleted: true });
  await AccountModel.findByIdAndUpdate(req.accountID, { $pull: { createdComments: req.params.id } });

  response.ok = true;
  res.status(200).json(response);
};

export const updateComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const comment = await CommentModel.findById(req.params.id);

  if (comment.deleted) {
    response.errors.push({ path: ['deleted'], message: 'Comment has been deleted' });
    next({ status: 404, ...response });
    return;
  }

  await comment.update({ edited: true, ...req.body });

  response.ok = true;
  res.status(200).json(response);
};
