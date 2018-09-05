import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import * as config from './config';
import errors from './errors/errors';
import routes from './routers/routes';
import { verifyToken } from './jwt';

// Connects to Mongodb
import './connection';

const server = express();

// Middleware
server.use(logger('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(verifyToken);

// Routes
routes(server);

// Error handling
errors(server);

server.listen(config.PORT, () => {
  console.log(`Server has started on port ${config.PORT}`);
});
