import express from 'express';

import CommentModel from '../models/Comment';
import { paramValidation } from '../validation/routes';
import * as commentsValidation from '../validation/comments';
import * as commentsController from '../controllers/comments';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

// router.route('/').post(auth.isLoggedIn, commentsValidation.createOrUpdateComment, commentsController.createComment); // REDO

router
  .route('/:id')
  .patch(
    auth.isLoggedIn, // complete
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', CommentModel), // complete
    commentsValidation.createOrUpdateComment, // complete
    commentsController.updateComment // complete
  )
  .delete(
    auth.isLoggedIn, // complete
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', CommentModel), // complete
    commentsController.deleteComment // complete
  );

router.route('/:id/reply').post(
  auth.isLoggedIn, // complete
  paramValidation('id', fields.mongoID), // complete
  commentsValidation.createOrUpdateComment, // complete
  commentsController.createComment // complete
);

export default router;
