import mongoose from 'mongoose';
import bluebird from 'bluebird';

import * as config from './config';

// mongoose.Promise = bluebird;
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose
  .connect(
    config.SRV,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });
