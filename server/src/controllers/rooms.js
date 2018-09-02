export const createRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and creating room..'
  });
  next();
};

export const getRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and getting specific room..'
  });
  next();
};

export const deleteRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and deleting specific room..'
  });
  next();
};

export const updateRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and updating specific room..'
  });
  next();
};

export const filterRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and filtering specific room..'
  });
  next();
};

export const joinRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and joining specific room..'
  });
  next();
};

export const leaveRoom = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and leaving specific room..'
  });
  next();
};
