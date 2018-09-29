import RoomModel from './models/Room';

export const isLoggedIn = (req, res, next) => {
  !req.account ? next({ status: 401, message: 'Must be logged in' }) : next();
  return req.account;
};

export const authorization = (id, model) => async (req, res, next) => {
  const resource = await model.findById(req.params[id]);

  if (!resource) {
    next({ status: 404, message: 'Resource not found' });
    return;
  }

  // deal with own resources
  if (resource.account && req.account._id === resource.account) {
    next();
    return;
  }

  // room creator deleting question in room
  if (req.method === 'DELETE' && req.params.questionID) {
    const room = await RoomModel.findById(req.params.roomID);

    if (room.account === req.account._id) {
      next();
      return;
    }
  }

  next({ status: 403, message: 'Access forbidden' });
};
