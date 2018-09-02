export const getAllUsers = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and getting ALL users...'
  });
  next();
};

export const getUser = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and getting SINGLE users...'
  });
  next();
};

export const createUser = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and adding new user to mongodb...'
  });
  next();
};

export const updateUser = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and updating existing user on mongodb...'
  });
  next();
};
