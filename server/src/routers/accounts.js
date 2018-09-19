import express from 'express';

import RoomModel from '../models/Room';
import QuestionModel from '../models/Question';
import * as accountsValidation from '../validation/accounts';
import * as accountsController from '../controllers/accounts';
import * as auth from '../auth';

const router = express.Router();

// routing flow:
// 1. is user logged in
// 2. validate route parameters
// 3. authorize account
// 4. validate body
// 5. call controller after success

router
  .route('/')
  .get(auth.isLoggedIn, accountsController.getAccount)
  .post(accountsValidation.createAccount, accountsController.createAccount)
  .patch(auth.isLoggedIn, accountsValidation.updateAccount, accountsController.updateAccount);

router.route('/joined-rooms').get(auth.isLoggedIn, accountsController.getList(RoomModel, 'joinedRooms'));

router.route('/created-questions').get(auth.isLoggedIn, accountsController.getList(QuestionModel, 'createdQuestions'));

router.route('/created-rooms').get(auth.isLoggedIn, accountsController.getList(RoomModel, 'createdRooms'));

router.route('/verify').post(auth.isLoggedIn, accountsValidation.verifyEmail, accountsController.sendEmailVerification);

router.route('/verify/:token').get(accountsController.verifyEmail);

router.route('/reset').post(accountsValidation.resetPassword, accountsController.resetPassword);

router.route('/reset/:token').post(accountsValidation.resetPasswordVerify, accountsController.resetPasswordVerify);

export default router;
