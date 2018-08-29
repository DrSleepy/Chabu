export default {
  getAllUsers: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting ALL users...'
    });
  },
  getSingleUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting SINGLE users...'
    });
  },
  addNewUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and adding new user to mongodb...'
    });
  },
  updateUser: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating existing user on mongodb...'
    });
  }
};
