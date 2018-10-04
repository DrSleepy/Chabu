import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import * as config from './config';
import { verifyToken } from './jwt';
import login from './routers/login';
import accounts from './routers/accounts';
import rooms from './routers/rooms';
import questions from './routers/questions';
import comments from './routers/comments';

import './connection';

const server = express();

// middleware
server.use(helmet());
server.use(compression());
server.use(logger('dev'));
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// server.use(cors({ origin: 'https://6f9198a8.ngrok.io', credentials: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(verifyToken);

// routes
server.use('/accounts', accounts);
server.use('/rooms', rooms);
server.use('/questions', questions);
server.use('/comments', comments);
server.use('/login', login);
server.use('/logout', (req, res) => res.clearCookie('token').sendStatus(200));

// error handling
server.use((err, req, res, next) => res.status(err.status).json(err)); // eslint-disable-line

server.listen(config.PORT, () => console.log(`Server has started on port ${config.PORT}`));
