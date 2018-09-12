import express from 'express';

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

router.route('/verify').post(auth.isLoggedIn, accountsValidation.verifyEmail, accountsController.sendEmailVerification);

router.route('/verify/:token').get(accountsController.verifyEmail);

export default router;
