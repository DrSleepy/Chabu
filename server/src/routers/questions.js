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
  .route('/:id')
  .get(
    paramValidation('id', fields.mongoID), // complete
    questionsController.getQuestion
  )
  .patch(
    auth.isLoggedIn, // complete
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', QuestionModel), // complete
    questionsValidation.updateQuestion, // complete
    questionsController.updateQuestion
  );

router.route('/:id/comment').post(
  auth.isLoggedIn, // complete
  paramValidation('id', fields.mongoID), // complete
  commentsValidation.createOrUpdateComment, // complete
  commentsController.createComment // complete
);

export default router;
