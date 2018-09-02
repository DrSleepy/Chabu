import { Schema, model, ObjectId } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20
  },
  password: {
    type: String,
    required: true,
    max: 30,
    min: 8
  },
  email: {
    type: String,
    required: false,
    max: 50,
    min: 4
  },
  showUsername: {
    type: Boolean,
    default: false,
    required: true
  },
  joinedRooms: [
    {
      type: ObjectId,
      ref: 'Room'
    }
  ],
  createdRooms: [
    {
      type: ObjectId,
      ref: 'Room'
    }
  ],
  createdQuestions: [
    {
      type: ObjectId,
      ref: 'Question'
    }
  ],
  createdComments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ]
});

const UserModel = model('User', UserSchema);

export default UserModel;
