import CommentModel from '../models/Comment';
import QuestionModel from '../models/Question';

export const createComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const newComment = await new CommentModel({
    account: req.account._id,
    showUsername: req.account.showUsername,
    ...req.body
  }).save();

  const isReply = req.baseUrl === '/comments';

  const model = isReply ? CommentModel : QuestionModel;
  const modelID = req.params.commentID || req.params.questionID;
  const resource = await model.findById(modelID);

  if (!resource) {
    response.errors.push({ path: ['resource'], message: 'Resource not found' });
    next({ status: 404, ...response });
    return;
  }

  await resource.update({ $push: { comments: newComment._id } });
  await req.account.update({ $push: { createdComments: newComment._id } });

  response.ok = true;
  res.status(200).json(response);
};

export const deleteComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const comment = await CommentModel.findById(req.params.commentID);
  if (comment.deleted) {
    response.errors.push({ path: ['comment'], message: 'Comment has been deleted' });
    next({ status: 404, ...response });
    return;
  }

  // update instead of delete - need child comments
  await comment.update({ text: null, deleted: true });
  await req.account.update({ $pull: { createdComments: req.params.commentID } });

  response.ok = true;
  res.status(200).json(response);
};

export const updateComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const comment = await CommentModel.findById(req.params.commentID);
  if (comment.deleted) {
    response.errors.push({ path: ['deleted'], message: 'Comment has been deleted' });
    next({ status: 404, ...response });
    return;
  }

  await comment.update({ edited: true, ...req.body });

  response.ok = true;
  res.status(200).json(response);
};
