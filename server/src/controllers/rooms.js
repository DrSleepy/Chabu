import AccountModel from '../models/Account';
import RoomModel from '../models/Room';

export const createRoom = async (req, res) => {
  const response = { ok: false, errors: [], data: null };

  const account = await AccountModel.findById(req.accountID);

  const newRoom = await new RoomModel({
    account: req.accountID,
    ...req.body
  }).save();

  await account.update({ $push: { createdRooms: newRoom._id } });

  response.ok = true;
  res.status(200).json(response);
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

export const joinRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and joining specific room..'
  });
};

export const leaveRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and leaving specific room..'
  });
};
