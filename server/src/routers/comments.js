import express from 'express';

import CommentModel from '../models/Comment';
import { paramValidation } from '../validation/routes';
import * as commentsValidation from '../validation/comments';
import * as commentsController from '../controllers/comments';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

router
  .route('/:commentID')
  .get(paramValidation('commentID', fields.uuid), commentsController.getComment)
  .post(
    auth.isLoggedIn,
    paramValidation('commentID', fields.uuid),
    commentsValidation.createOrUpdateComment,
    commentsController.createComment
  )
  .patch(
    auth.isLoggedIn,
    paramValidation('commentID', fields.uuid),
    auth.authorization('commentID', CommentModel),
    commentsValidation.createOrUpdateComment,
    commentsController.updateComment
  )
  .delete(
    auth.isLoggedIn,
    paramValidation('commentID', fields.uuid),
    auth.authorization('commentID', CommentModel),
    commentsController.deleteComment
  );

export default router;
