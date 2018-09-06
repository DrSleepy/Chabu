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
  .route('/:commentID')
  .patch(
    auth.isLoggedIn, // complete
    paramValidation('commentID', fields.mongoID), // complete
    auth.authorization('commentID', CommentModel), // complete
    commentsValidation.createOrUpdateComment, // complete
    commentsController.updateComment // complete
  )
  .delete(
    auth.isLoggedIn, // complete
    paramValidation('commentID', fields.mongoID), // complete
    auth.authorization('commentID', CommentModel), // complete
    commentsController.deleteComment // complete
  );

router.route('/:commentID/reply').post(
  auth.isLoggedIn, // complete
  paramValidation('commentID', fields.mongoID), // complete
  commentsValidation.createOrUpdateComment, // complete
  commentsController.createComment // complete
);

export default router;
