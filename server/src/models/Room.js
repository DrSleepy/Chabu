import mongoose, { Schema } from 'mongoose';

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
    default: null,
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
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

const RoomModel = mongoose.model('Room', RoomSchema);
export default RoomModel;
