import express from 'express';

import AccountModel from '../models/Account';
import { paramValidation } from '../validation/routes';
import { auth } from '../auth';
import * as bodyValidation from '../validation/accounts';
import * as accountsController from '../controllers/accounts';
import * as fields from '../joi';

const router = express.Router();

// routing flow:
// 1. validate route parameters
// 2. validate body
// 3. call controller after success

router.route('/').post(bodyValidation.createAccount, accountsController.createAccount);

router
  .route('/:id')
  .get(paramValidation('id', fields.mongoID), accountsController.getAccount)
  .patch(
    paramValidation('id', fields.mongoID),
    auth(AccountModel, 'id'),
    bodyValidation.updateAccount,
    accountsController.updateAccount
  );

export default router;
