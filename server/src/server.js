import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

import * as config from './config';
import routes from './routes/routes';
import errors from './errors/errors';

// Connects to Mongodb
import './connection';

const server = express();

// Middleware
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(cors());

// Routes
routes(server);

// Error handling
errors(server);

server.listen(config.PORT, () => {
  console.log(`Server has started on port ${config.PORT}`);
});
