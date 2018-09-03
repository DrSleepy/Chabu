import { Schema, ObjectId, model } from 'mongoose';

const AccountSchema = new Schema({
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
    min: 8,
    max: 30
  },
  email: {
    type: String,
    default: null,
    min: 4,
    max: 50
  },
  showUsername: {
    type: Boolean,
    default: false
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

const AccountModel = model('Account', AccountSchema);

export default AccountModel;