import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

mongoose
  .connect(config.database.srv)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });
