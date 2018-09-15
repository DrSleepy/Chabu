import RoomModel from '../models/Room';
import QuestionModel from '../models/Question';

export const createQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

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

  const newQuestion = await new QuestionModel({ account: req.account._id, ...req.body }).save();

  const updateRoom = room.update({ $push: { questions: newQuestion._id, likedQuestions: newQuestion._id } }).exec();
  const updateAccount = req.account.update({ $push: { createdQuestions: newQuestion._id } }).exec();

  await Promise.all([updateRoom, updateAccount]);

  response.ok = true;
  res.status(200).json(response);
};

export const getQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const question = await QuestionModel.findById(req.params.questionID).populate('comments');

  // const question = await QuestionModel.findById(req.params.questionID)
  //   .populate({
  //     path: 'comments',
  //     populate: {
  //       path: 'comments',
  //       populate: {
  //         path: 'comments',
  //         populate: {
  //           path: 'comments',
  //           populate: {
  //             path: 'comments'
  //           }
  //         }
  //       }
  //     }
  //   })
  //   .lean()
  //   .exec();

  if (!question) {
    response.errors.push({ path: ['question'], message: 'Question not found' });
    next({ status: 404, ...response });
    return;
  }

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

export const deleteQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const room = await RoomModel.findById(req.params.roomID);
  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  if (!room.questions.includes(req.params.questionID)) {
    response.errors.push({ path: ['question'], message: 'Question not found in room' });
    next({ status: 404, ...response });
    return;
  }

  await room.update({ $pull: { questions: req.params.questionID } });

  // remove() used to fire RoomSchema 'remove' hook
  const question = await QuestionModel.findById(req.params.questionID);
  await question.remove();

  response.ok = true;
  res.status(200).json(response);
};

export const likeQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const liked = req.account.likedQuestions.find(ID => ID === req.params.questionID);
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

  const updateQuestionResult = question.update({ $inc: { likes: vote } }).exec();
  const updateAccount = req.account.update({ [action]: { likedQuestions: req.params.questionID } }).exec();

  await Promise.all([updateQuestionResult, updateAccount]);

  response.ok = true;
  res.status(200).json(response);
};
