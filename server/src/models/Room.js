import { Schema, model, ObjectId } from 'mongoose';

const RoomSchema = new Schema({
  id: {
    // automatically generated. How?
    type: String
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 100
  },
  creator: {
    type: String,
    required: false,
    min: 3,
    max: 20
  },
  date: {
    type: Date,
    default: Date.now
  },
  unlocked: {
    type: Boolean,
    default: true
  },
  questions: [
    {
      type: ObjectId,
      ref: 'Question'
    }
  ],
  account: {
    type: ObjectId,
    ref: 'Account'
  }
});

const RoomModel = model('Room', RoomSchema);

export default RoomModel;
