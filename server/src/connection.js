import mongoose from 'mongoose';
import * as config from './config';

mongoose.Promise = global.Promise;

mongoose
  .connect(config.SRV)
  .then(result => {
    console.log('Connected to MongoDB', result);
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });
