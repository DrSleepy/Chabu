import express from 'express';

import { paramValidation } from '../validation/routes';
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
  .route('/:username')
  .get(paramValidation('username', fields.username), accountsController.getAccount)
  .patch(paramValidation('username', fields.username), bodyValidation.updateAccount, accountsController.updateAccount);

export default router;
