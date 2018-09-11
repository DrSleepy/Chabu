import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';

import AccountModel from './Account';
import { deleteQuestions } from './Question';

const RoomSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
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
      type: String,
      ref: 'Question'
    }
  ],
  members: [
    {
      type: String,
      ref: 'Account'
    }
  ],
  account: {
    type: String,
    ref: 'Account'
  }
});

RoomSchema.set('toObject', { getters: true });

RoomSchema.virtual('timeAgo').get(function() {
  return moment(this.date).from(new Date());
});

function pullRoomFromMembers() {
  this.members.forEach(async memberID => {
    await AccountModel.findByIdAndUpdate(memberID, { $pull: { joinedRooms: this._id } });
  });
}

RoomSchema.pre('remove', async function(next) {
  deleteQuestions.call(this);
  pullRoomFromMembers.call(this);
  await AccountModel.findByIdAndUpdate(this.account, { $pull: { createdRooms: this._id } });
  next();
});

const RoomModel = mongoose.model('Room', RoomSchema);
export default RoomModel;
