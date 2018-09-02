const rooms = {
  createRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and creating room..'
    });
    next();
  },
  getRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting specific room..'
    });
    next();
  },
  deleteRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and deleting specific room..'
    });
    next();
  },
  updateRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating specific room..'
    });
    next();
  },
  filterRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and filtering specific room..'
    });
    next();
  },
  joinRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and joining specific room..'
    });
    next();
  },
  leaveRoom: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and leaving specific room..'
    });
    next();
  }
};

export default rooms;
