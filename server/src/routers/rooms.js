import express from 'express';

import QuestionModel from '../models/Question';
import { paramValidation } from '../validation/routes';
import * as roomsValidation from '../validation/rooms';
import * as roomsController from '../controllers/rooms';
import * as questionsValidation from '../validation/questions';
import * as questionsController from '../controllers/questions';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

router.route('/').post(auth.isLoggedIn, roomsValidation.createRoom, roomsController.createRoom);

router
  .route('/:roomID')
  .post(
    auth.isLoggedIn /* done */,
    paramValidation('roomID', fields.mongoID) /* done */,
    questionsValidation.createQuestion /* done */,
    questionsController.createQuestion
  );

router.route('/:roomID/:questionID').delete(
  auth.isLoggedIn /* done */,
  paramValidation('roomID', fields.mongoID) /* done */,
  paramValidation('questionID', fields.mongoID),
  auth.authorization('questionID', QuestionModel), // complete
  questionsController.deleteQuestion
);

export default router;
