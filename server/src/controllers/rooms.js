import AccountModel from '../models/Account';
import RoomModel from '../models/Room';
import appendRelativeTime from '../helpers/relativeTime';
import filterQuestionsByKeywords from './questions';
import * as questionsController from './questions';
import QuestionModel from '../models/Question';

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

const filterQuestions = (query, questions) => {};

const buildQuery = criteria => {
  const query = {};

  if (criteria.keywords) {
    query.$text = { $search: criteria.keywords };
    // query.score = { $meta: 'textScore' };
  }

  return query;
};

export const getRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  // if (Object.keys(req.query).length) {
  // room.questions = filterQuestions(req.query);
  // buildQuery(req.query);
  // }

  // const query = buildQuery(req.query);
  // console.log(query);

  // console.log(req.query.keywords);

  // const room = await RoomModel.findById(req.params.roomID)
  //   .populate({ path: 'questions', match: query })
  //   .lean()
  //   .exec();

  // const query = buildQuery(req.query);

  // const room = await RoomModel.findById(req.params.roomID).populate({
  //   path: 'questions',
  //   match: {
  //     $text: { $search: 'jack water' }
  //     // score: { $meta: 'textScore' }
  //   },
  //   score: { $meta: 'textScore' },
  //   options: { sort: { score: { $meta: 'textScore' } } }
  // });

  // const room = await RoomModel.findById(req.params.roomID).populate({
  //   path: 'questions',
  //   match: {
  //     $text: { $search: 'jack water' }
  //   },
  //   score: { $meta: 'textScore' },
  //   options: { sort: { score: 1 } }
  // });
  const room = await RoomModel.findById(req.params.roomID).populate({
    path: 'questions',
    match: {
      $text: { $search: 'jack water' }
    },
    score: { $meta: 'textScore' },
    options: { sort: { score: 1 } }
  });

  // const room = await QuestionModel.find(
  //   {
  //     $text: { $search: 'jack water' }
  //   },
  //   {
  //     score: { $meta: 'textScore' }
  //   }
  // ).sort({
  //   score: { $meta: 'textScore' }
  // });

  // const questions = await QuestionModel.find({ $text: { $search: 'water' } });

  console.log(room);

  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
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
