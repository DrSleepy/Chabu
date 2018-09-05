import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import * as config from './config';
import routes from './routers/routes';
import { verifyToken } from './jwt';

// connects to Mongodb
import './connection';

const server = express();

// middleware
server.use(logger('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(verifyToken);

// routes
routes(server);

// error handling
server.use((err, req, res, next) => res.status(err.status).json(err)); // eslint-disable-line

server.listen(config.PORT, () => console.log(`Server has started on port ${config.PORT}`));
