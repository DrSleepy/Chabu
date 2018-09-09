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

export const getRoom = (req, res) => {
  const response = { ok: false, errors: [], data: null };

  response.ok = true;
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

export const updateRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and updating specific room..'
  });
};

export const filterRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and filtering specific room..'
  });
};

export const leaveRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and leaving specific room..'
  });
};
