import AccountModel from '../models/Account';
import RoomModel from '../models/Room';
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

  if (req.query.keywords) {
    const filteredQuestions = filterQuestionsByKeywords(room.questions, req.query.keywords);
    room.questions = filteredQuestions;
  }

  if (req.query.startDate) {
    const filteredQuestions = room.questions.filter(question => question.date.toISOString() < req.query.startDate);
    room.questions = filteredQuestions;
  }

  if (req.query.endDate) {
    const filteredQuestions = room.questions.filter(question => question.date.toISOString() > req.query.startDate);
    room.questions = filteredQuestions;
  }

  // AppendRelativeTime - momentJS
  if (req.query.view) {
    switch (req.query.view) {
      case 'today':
        {
          const filteredQuestions = room.questions.filter(question => {
            const date = new Date();
            return question.date.getDate() === date.getDate();
          });
          room.questions = filteredQuestions;
        }
        break;

      case 'week':
        {
          const filteredQuestions = room.questions.filter(question => {
            const date = new Date();
            return question.date.getWeek() === date.getWeek();
          });
          room.questions = filteredQuestions;
        }
        break;

      case 'month':
        break;

      case 'year':
        break;

      default:
        break;
    }
    const filteredQuestions = room.questions.filter(question => question.date.toISOString() > req.query.startDate);
    room.questions = filteredQuestions;
  }

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

export const filterRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and filtering specific room..'
  });
};
