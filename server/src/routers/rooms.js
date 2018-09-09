import express from 'express';

import RoomModel from '../models/Room';
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
  .get(paramValidation('roomID', fields.mongoID), roomsController.getRoom)
  .post(
    auth.isLoggedIn,
    paramValidation('roomID', fields.mongoID),
    questionsValidation.createQuestion,
    questionsController.createQuestion
  )
  .patch(
    auth.isLoggedIn,
    paramValidation('roomID', fields.mongoID),
    auth.authorization('roomID', RoomModel),
    roomsValidation.updateRoom,
    roomsController.updateRoom
  )
  .delete(
    auth.isLoggedIn,
    paramValidation('roomID', fields.mongoID),
    auth.authorization('roomID', RoomModel),
    roomsController.deleteRoom
  );

router
  .route('/:roomID/:questionID')
  .delete(
    auth.isLoggedIn,
    paramValidation('roomID', fields.mongoID),
    paramValidation('questionID', fields.mongoID),
    auth.authorization('questionID', QuestionModel),
    questionsController.deleteQuestion
  );

router.route('/:roomID/join').patch(auth.isLoggedIn, paramValidation('roomID', fields.mongoID), roomsController.joinRoom);

export default router;
