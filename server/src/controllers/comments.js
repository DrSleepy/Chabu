import CommentModel from '../models/Comment';
import QuestionModel from '../models/Question';

export const createComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const isReply = req.baseUrl === '/comments';

  const model = isReply ? CommentModel : QuestionModel;
  const modelID = req.params.commentID || req.params.questionID;
  const resource = await model.findById(modelID);

  if (!resource) {
    response.errors.push({ path: ['resource'], message: 'Resource not found' });
    next({ status: 404, ...response });
    return;
  }

  const newComment = await new CommentModel({
    account: req.account._id,
    showUsername: req.account.showUsername,
    ...req.body
  }).save();

  const comment = await CommentModel.findById(newComment._id).populate({
    path: 'account',
    select: ['username', 'showUsername']
  });

  const updateResource = resource.update({ $push: { comments: newComment._id } }).exec();
  const updateAccount = req.account.update({ $push: { createdComments: newComment._id } }).exec();

  await Promise.all([updateResource, updateAccount]);

  response.ok = true;
  response.data = comment;
  res.status(200).json(response);
};

export const getComment = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const comment = await CommentModel.findById(req.params.commentID).populate({
    path: 'comments',
    populate: {
      path: 'account',
      select: ['username', 'showUsername']
    }
  });

  if (!comment) {
    response.errors.push({ path: ['comment'], message: 'Comment not found' });
    next({ status: 404, ...response });
    return;
  }

  response.ok = true;
  response.data = comment;
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
  const updateComment = comment.update({ text: null, deleted: true }).exec();
  const updateAccount = req.account.update({ $pull: { createdComments: req.params.commentID } }).exec();

  await Promise.all([updateComment, updateAccount]);

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
