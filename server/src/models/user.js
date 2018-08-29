import mongoose from 'mongoose';

// Look into how and were exactly to create Mongodb tables
// the schema is only used to validate user objects against
// schema before attempting to send object to database

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
