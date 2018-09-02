import express from 'express';

import UsersController from '../controllers/users';
import BodyValidation from '../validation/users';
import RouteValidation from '../validation/routes';

const router = express.Router();

// routing flow:
// 1. validate route parameters
// 2. validate body
// 3. call controller after success

router
  .route('/')
  .get(RouteValidation.xxx, UsersController.getAllUsers)
  .post(RouteValidation.xxx, BodyValidation.xxx, UsersController.addNewUser);

router
  .route('/:id')
  .get(RouteValidation.xxx, UsersController.getAllUsers)
  .post(RouteValidation.xxx, BodyValidation.xxx, UsersController.addNewUser);

export default router;
