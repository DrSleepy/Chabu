import { Schema, model, ObjectId } from 'mongoose';

const RoomSchema = new Schema({
  id: {
    // automatically generated. How?
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    max: 30,
    min: 5
  },
  creator: {
    type: String,
    required: false,
    max: 20,
    min: 5
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
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

const RoomModel = model('Room', RoomSchema);

export default RoomModel;
