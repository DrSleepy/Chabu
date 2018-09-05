import express from 'express';

import CommentModel from '../models/Comment';
import { paramValidation } from '../validation/routes';
import * as bodyValidation from '../validation/comments';
import * as commentsController from '../controllers/comments';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

router.route('/').post(auth.isLoggedIn, bodyValidation.createOrUpdateComment, commentsController.createComment); // complete

router
  .route('/:id')
  .patch(
    auth.isLoggedIn, // complete
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', CommentModel), // complete
    bodyValidation.createOrUpdateComment, // complete
    commentsController.updateComment // complete
  )
  .delete();

export default router;
