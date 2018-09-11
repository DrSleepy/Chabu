import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

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
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Account'
    }
  ],
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

// eslint-disable-next-line
RoomSchema.virtual('dateAgo').get(function() {
  return moment(this.date).from(new Date());
});

RoomSchema.set('toObject', { getters: true });

const RoomModel = mongoose.model('Room', RoomSchema);
export default RoomModel;
