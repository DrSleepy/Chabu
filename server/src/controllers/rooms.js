import AccountModel from '../models/Account';
import RoomModel from '../models/Room';

export const joinRoom = async (req, res, next) => {
  const response = { ok: false, errors: [], data: null };

  // locals set by 'createRoom' middleware
  const roomID = req.params.roomID || res.locals.roomID;

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
  res.locals.roomID = newRoom._id;
  next();
};

export const getRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and getting specific room..'
  });
};

export const deleteRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and deleting specific room..'
  });
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
