import express from 'express';

import * as auth from '../auth';
import * as bodyValidation from '../validation/comments';
import * as commentsController from '../controllers/comments';

const router = express.Router();

router.route('/').post(auth.isLoggedIn, bodyValidation.createComment, commentsController.createComment);

router
  .route('/:id')
  .patch()
  .delete();

export default router;
