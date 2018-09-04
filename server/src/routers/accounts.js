import express from 'express';

import AccountModel from '../models/Account';
import { paramValidation } from '../validation/routes';
import { authorization } from '../authorization';
import * as bodyValidation from '../validation/accounts';
import * as accountsController from '../controllers/accounts';
import * as fields from '../joi';

const router = express.Router();

// routing flow:
// 1. validate route parameters
// 2. authorize account
// 3. validate body
// 4. call controller after success

router.route('/').post(bodyValidation.createAccount, accountsController.createAccount);

router
  .route('/:id')
  .get(paramValidation('id', fields.mongoID), accountsController.getAccount)
  .patch(
    paramValidation('id', fields.mongoID),
    authorization('id', AccountModel),
    bodyValidation.updateAccount,
    accountsController.updateAccount
  );

export default router;
