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

router
  .route('/:questionID')
  .get(paramValidation('questionID', fields.uuid), questionsController.getQuestion)
  .post(
    auth.isLoggedIn,
    paramValidation('questionID', fields.uuid),
    commentsValidation.createOrUpdateComment,
    commentsController.createComment
  )
  .patch(
    auth.isLoggedIn,
    paramValidation('questionID', fields.uuid),
    auth.authorization('questionID', QuestionModel),
    questionsValidation.updateQuestion,
    questionsController.updateQuestion
  );

router
  .route('/:questionID/like')
  .patch(auth.isLoggedIn, paramValidation('questionID', fields.uuid), questionsController.likeQuestion);

export default router;
