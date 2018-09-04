import express from 'express';

import * as loginController from '../controllers/login';
import * as bodyValidation from '../validation/login';

const router = express.Router();

router.route('/').post(bodyValidation.login, loginController.login);

export default router;
