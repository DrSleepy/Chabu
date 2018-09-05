import express from 'express';

import AccountModel from '../models/Account';
import { paramValidation } from '../validation/routes';
import * as bodyValidation from '../validation/accounts';
import * as accountsController from '../controllers/accounts';
import * as auth from '../auth';
import * as fields from '../joi';

const router = express.Router();

// routing flow:
// 1. is user logged in
// 2. validate route parameters
// 3. authorize account
// 4. validate body
// 5. call controller after success

router.route('/').post(bodyValidation.createAccount, accountsController.createAccount); // complete

router
  .route('/:id')
  .get(
    auth.isLoggedIn, // complete
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', AccountModel), // complete
    accountsController.getAccount // complete
  )
  .patch(
    auth.isLoggedIn,
    paramValidation('id', fields.mongoID), // complete
    auth.authorization('id', AccountModel), // complete
    bodyValidation.updateAccount, // complete
    accountsController.updateAccount // complete
  );

export default router;
