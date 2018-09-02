export const createQuestion = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and creating question..'
  });
  next();
};

export const getQuestion = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and getting specific question..'
  });
  next();
};

export const updateQuestion = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and updating specific questions..'
  });
  next();
};

export const deleteQuestion = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and deleting specific question..'
  });
  next();
};

export const likeQuestion = (req, res, next) => {
  res.status(200).json({
    message: 'Validated and liking specific question..'
  });
  next();
};
