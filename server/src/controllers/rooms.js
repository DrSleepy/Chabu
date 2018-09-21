import RoomModel from '../models/Room';
import QuestionModel from '../models/Question';
import buildQuery from '../helpers/buildQuery';

const joinRoomLogic = async (account, roomID) => {
  const joined = account.joinedRooms.find(ID => ID === roomID);
  const room = await RoomModel.findById(roomID);

  if (!room) return false;

  const action = joined ? '$pull' : '$push';
  const updateAccount = account.update({ [action]: { joinedRooms: roomID } }).exec();
  const updateRoom = room.update({ [action]: { members: account._id } }).exec();

  await Promise.all([updateAccount, updateRoom]);

  return true;
};

export const joinRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const joinedRoom = await joinRoomLogic(req.account, req.params.roomID);
  if (!joinedRoom) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  response.ok = true;
  res.status(200).json(response);
};

export const createRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const newRoom = await new RoomModel({ account: req.account._id, ...req.body }).save();

  const updateAccount = req.account.update({ $push: { createdRooms: newRoom._id } }).exec();
  const joinRoomResult = joinRoomLogic(req.account, newRoom._id);

  await Promise.all([updateAccount, joinRoomResult]);

  response.ok = true;
  response.data = newRoom;
  res.status(200).json(response);
};

export const getRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  const room = await RoomModel.findById(req.params.roomID).populate('questions');
  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  const query = Object.keys(req.query).length ? buildQuery(req.query) : {};

  room.questions = await QuestionModel.find({ _id: { $in: room.questions }, ...query.find }, query.options).sort(query.sort);

  response.ok = true;
  response.data = room;
  res.status(200).json(response);
};

export const deleteRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  // remove() used to fire RoomSchema 'remove' hook
  const room = await RoomModel.findById(req.params.roomID);
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
