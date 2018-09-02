const questions = {
  createQuestion: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and creating question..'
    });
    next();
  },
  getQuestion: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and getting specific question..'
    });
    next();
  },
  updateQuestion: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and updating specific questions..'
    });
    next();
  },
  deleteQuestion: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and deleting specific question..'
    });
    next();
  },
  likeQuestion: (req, res, next) => {
    res.status(200).json({
      message: 'Validated and liking specific question..'
    });
    next();
  }
};

export default questions;
