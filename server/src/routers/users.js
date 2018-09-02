import express from 'express';

import UsersController from '../controllers/users';
import BodyValidation from '../validation/users';
import RouteValidation from '../validation/routes';

const router = express.Router();

// Validate body AND dynamic route parameters
// Validate: HTTP methods below
// HTTP methods to validate: POST, PUT, PATCH, DELETE
// More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
router
  .route('/')
  .get(UsersController.getAllUsers)
  .post(BodyValidation.addNewUser, UsersController.addNewUser);

router
  .route('/:xxx/:yyy')
  .get(RouteValidation.mongoId('xxx'), RouteValidation.mongoId('yyy'), UsersController.getSingleUser)
  .patch(
    RouteValidation.mongoId('xxx'),
    RouteValidation.mongoId('yyy'),
    BodyValidation.updateUser,
    UsersController.updateUser
  );

export default router;
