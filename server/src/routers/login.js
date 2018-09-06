import express from 'express';

import * as loginValidation from '../validation/login';
import * as loginController from '../controllers/login';

const router = express.Router();

router.route('/').post(loginValidation.login, loginController.login); // complete

export default router;
