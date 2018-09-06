import QuestionModel from '../models/Question';
import AccountModel from '../models/Account';

export const createQuestion = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);

  const newQuestion = await new QuestionModel({
    account: req.accountID,
    ...req.body
  }).save();

  await account.update({ $push: { createdQuestions: newQuestion._id } });

  response.ok = true;
  res.status(200).json(response);
};

export const getQuestion = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const question = await QuestionModel.findById(req.params.id);
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

  await QuestionModel.findByIdAndUpdate(req.params.id, { edited: true, ...req.body });

  response.ok = true;
  res.status(200).json(response);
};

export const deleteQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and deleting specific question..'
  });
};

export const likeQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and liking specific question..'
  });
};
