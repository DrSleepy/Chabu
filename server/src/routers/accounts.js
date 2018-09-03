import express from 'express';

import * as bodyValidation from '../validation/accounts';
import * as accountsController from '../controllers/accounts';

const router = express.Router();

// routing flow:
// 1. validate route parameters
// 2. validate body
// 3. call controller after success

router
  .route('/')
  .post(bodyValidation.createAccount, accountsController.createAccount)
  .patch(bodyValidation.updateAccount, accountsController.updateAccount);

export default router;
