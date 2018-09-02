export default {
  getAllUsers: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting ALL users...'
    });
    next();
  },
  getSingleUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting SINGLE users...'
    });
    next();
  },
  addNewUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and adding new user to mongodb...'
    });
    next();
  },
  updateUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating existing user on mongodb...'
    });
    next();
  }
};
