import AccountModel from '../models/Account';
import RoomModel from '../models/Room';
import QuestionModel from '../models/Question';
import appendRelativeTime from '../helpers/relativeTime';
import * as commentsController from './comments';

export const filterQuestionsByKeywords = (questions, keywords) => {
  const keywordsSet = new Set([...keywords.split(' ')]);

  return questions.filter(question => {
    let relevanceLevel = 0;

    keywordsSet.forEach(word => {
      if (question.title.toLowerCase().includes(word.toLowerCase())) {
        relevanceLevel++;
      }
    });

    question.relevanceLevel = relevanceLevel;

    return relevanceLevel > 0;
  });
};

export const createQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);
  const newQuestion = await new QuestionModel({ account: req.accountID, ...req.body }).save();
  const room = await RoomModel.findById(req.params.roomID);

  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  if (!room.unlocked) {
    response.errors.push({ path: ['room'], message: 'Room is locked' });
    next({ status: 409, ...response });
    return;
  }

  await room.update({ $push: { questions: newQuestion._id } });
  await account.update({ $push: { createdQuestions: newQuestion._id } });

  response.ok = true;
  res.status(200).json(response);
};

export const getQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const question = await QuestionModel.findById(req.params.questionID).populate('comments');
  if (!question) {
    response.errors.push({ path: ['question'], message: 'Question not found' });
    next({ status: 404, ...response });
    return;
  }

  question.comments = appendRelativeTime(question.comments);

  response.ok = true;
  response.data = question;
  res.status(200).json(response);
};

export const updateQuestion = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  await QuestionModel.findByIdAndUpdate(req.params.questionID, { edited: true, ...req.body });

  response.ok = true;
  res.status(200).json(response);
};

export const deleteQuestionLogic = async question => {
  if (question.comments.length) {
    question.comments.forEach(comment => commentsController.deleteAllComments(comment._id));
  }

  await AccountModel.findByIdAndUpdate(question.account, { $pull: { createdQuestions: question._id } });
  await question.remove();
};

export const deleteQuestion = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const question = await QuestionModel.findById(req.params.questionID);
  deleteQuestionLogic(question);

  await RoomModel.findByIdAndUpdate(req.params.roomID, { $pull: { questions: req.params.questionID } });

  response.ok = true;
  res.status(200).json(response);
};

export const likeQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);
  const liked = account.likedQuestions.find(objectID => objectID._id == req.params.questionID);
  const question = await QuestionModel.findById(req.params.questionID);

  if (!question) {
    response.errors.push({ path: ['question'], message: 'Question not found' });
    next({ status: 404, ...response });
    return;
  }

  let action = '$push';
  let vote = 1;

  if (liked) {
    action = '$pull';
    vote = -1;
  }

  await question.update({ $inc: { likes: vote } });
  await account.update({ [action]: { likedQuestions: req.params.questionID } });

  response.ok = true;
  res.status(200).json(response);
};
