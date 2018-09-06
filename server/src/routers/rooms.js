import express from 'express';

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
  .route('/:id/question')
  .post(
    auth.isLoggedIn /* done */,
    paramValidation('id', fields.mongoID) /* done */,
    questionsValidation.createQuestion /* done */,
    questionsController.createQuestion
  );

export default router;
