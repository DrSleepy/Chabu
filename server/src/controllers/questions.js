export const createQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and creating question..'
  });
};

export const getQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and getting specific question..'
  });
};

export const updateQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and updating specific questions..'
  });
};

export const deleteQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and deleting specific question..'
  });
};

export const likeQuestion = (req, res) => {
  res.status(200).json({
    message: 'Validated and liking specific question..'
  });
};
