import mongoose from 'mongoose';

import * as config from './config';

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
