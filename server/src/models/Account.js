import mongoose, { Schema } from 'mongoose';

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
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  createdRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  createdQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  createdComments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const AccountModel = mongoose.model('Account', AccountSchema);

export default AccountModel;
