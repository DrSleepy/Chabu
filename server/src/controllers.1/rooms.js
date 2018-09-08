import AccountModel from '../models/Account';
import RoomModel from '../models/Room';

export const joinRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  // locals set by 'createRoom' middleware
  const roomID = req.params.roomID || req.locals.roomID;

  const account = await AccountModel.findById(req.accountID);
  const joined = account.joinedRooms.find(objectID => objectID._id == roomID);
  const room = await RoomModel.findById(roomID);

  if (!room) {
    response.errors.push({ path: ['room'], message: 'Room not found' });
    next({ status: 404, ...response });
    return;
  }

  const action = joined ? '$pull' : '$push';
  await account.update({ [action]: { joinedRooms: roomID } });

  response.ok = true;
  res.status(200).json(response);
};

export const createRoom = async (req, res, next) => {
  const account = await AccountModel.findById(req.accountID);
  const newRoom = await new RoomModel({ account: req.accountID, ...req.body }).save();

  await account.update({ $push: { createdRooms: newRoom._id } });

  // set locals for 'joinRoom' middleware, which runs next
  req.locals.roomID = newRoom._id;
  next();
};

export const getRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and getting specific room..'
  });
};

export const deleteRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  // Deleting a room:
  // 1. Do i delete comments? Yes.
  //
  // 2. Do i delete questions? Yes.
  //
  // 3. Do i remove roomID from joinedRooms/createdRooms? Yes.
  //
  // - Add accounts[] to rooms
  // - UPDATE deleteQuestion to ignore if room has been delete
  // otherwise an error will be thrown when trying an exists question
  // in an already deleted room

  await RoomModel.findByIdAndRemove(req.params.roomID);

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
