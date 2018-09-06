import express from 'express';

import QuestionModel from '../models/Question';
import { paramValidation } from '../validation/routes';
import * as questionsValidation from '../validation/questions';
import * as questionsController from '../controllers/questions';
import * as commentsController from '../controllers/comments';
import * as commentsValidation from '../validation/comments';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

router.route('/').post(auth.isLoggedIn, questionsValidation.createQuestion, questionsController.createQuestion); // completed

router
  .route('/:questionID')
  .get(
    paramValidation('questionID', fields.mongoID), // complete
    questionsController.getQuestion
  )
  .patch(
    auth.isLoggedIn, // complete
    paramValidation('questionID', fields.mongoID), // complete
    auth.authorization('questionID', QuestionModel), // complete
    questionsValidation.updateQuestion, // complete
    questionsController.updateQuestion
  )
  .delete(
    auth.isLoggedIn,
    paramValidation('questionID', fields.mongoID),
    auth.authorization('questionID', QuestionModel),
    questionsController.deleteQuestion
  );

router.route('/:questionID/comment').post(
  auth.isLoggedIn, // complete
  paramValidation('questionID', fields.mongoID), // complete
  commentsValidation.createOrUpdateComment, // complete
  commentsController.createComment // complete
);

export default router;
