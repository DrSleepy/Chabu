export const createRoom = (req, res) => {
  res.status(200).json({
    message: 'Validated and creating room..'
  });
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
