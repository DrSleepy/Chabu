import AccountModel from '../models/Account';
import RoomModel from '../models/Room';
import appendRelativeTime from '../helpers/relativeTime';
import filterQuestionsByKeywords from './questions';
import * as questionsController from './questions';

const joinRoomLogic = async (accountID, roomID) => {
  const account = await AccountModel.findById(accountID);
  const joined = account.joinedRooms.find(objectID => objectID._id == roomID);
  const room = await RoomModel.findById(roomID);

  if (!room) return false;

  const action = joined ? '$pull' : '$push';
  await account.update({ [action]: { joinedRooms: roomID } });
  await room.update({ [action]: { members: accountID } });

  return true;
};

export const joinRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const joinedRoom = joinRoomLogic(req.accountID, req.params.roomID);
  if (!joinedRoom) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  response.ok = true;
  res.status(200).json(response);
};

export const createRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);
  const newRoom = await new RoomModel({ account: req.accountID, ...req.body }).save();

  await account.update({ $push: { createdRooms: newRoom._id } });

  const joinedRoom = joinRoomLogic(req.accountID, newRoom._id);
  if (!joinedRoom) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  response.ok = true;
  res.status(200).json(response);
};

const filterQuestions = (query, questions) => {
  let filteredQuestions = questions;

  if (query.keywords) {
    filteredQuestions = filterQuestionsByKeywords(filteredQuestions, query.keywords);
  }

  if (query.startDate) {
    filteredQuestions = filteredQuestions.filter(question => question.date.toISOString() < query.startDate);
  }

  if (query.endDate) {
    filteredQuestions = filteredQuestions.filter(question => question.date.toISOString() > query.startDate);
  }

  return filteredQuestions;

  // if (query.view) {
  //   switch (query.view) {
  //     case 'today':
  //       {
  //         const filteredQuestions = questions.filter(question => {
  //           const date = new Date();
  //           return question.date.getDate() === date.getDate();
  //         });
  //         questions = filteredQuestions;
  //       }
  //       break;

  //     case 'week':
  //       {
  //         const filteredQuestions = questions.filter(question => {
  //           const date = new Date();
  //           return question.date.getWeek() === date.getWeek();
  //         });
  //         questions = filteredQuestions;
  //       }
  //       break;

  //     case 'month':
  //       break;

  //     case 'year':
  //       break;

  //     default:
  //       break;
  //   }
  //   return questions.filter(question => question.date.toISOString() > query.startDate);
  // }
};

export const getRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const room = await RoomModel.findById(req.params.roomID)
    .populate('questions')
    .lean()
    .exec();

  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  if (Object.keys(req.query).length) {
    room.questions = filterQuestions(req.query);
  }

  room.questions = appendRelativeTime(room.questions);

  response.ok = true;
  response.data = room;
  res.status(200).json(response);
};

export const deleteRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const room = await RoomModel.findById(req.params.roomID).populate('questions');
  if (room && room.questions.length) {
    room.questions.forEach(question => questionsController.deleteQuestionLogic(question));
  }

  room.members.forEach(async memberID => {
    await AccountModel.findByIdAndUpdate(memberID, { $pull: { joinedRooms: req.params.roomID } });
  });

  await AccountModel.findByIdAndUpdate(req.accountID, { $pull: { createdRooms: req.params.roomID } });
  await room.remove();

  response.ok = true;
  res.status(200).json(response);
};

export const updateRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  await RoomModel.findByIdAndUpdate(req.params.roomID, req.body);

  response.ok = true;
  res.status(200).json(response);
};
