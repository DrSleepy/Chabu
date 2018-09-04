import express from 'express';

import * as loginController from '../controllers/login';

const router = express.Router();

router.route('/').post(loginController.login);

export default router;
