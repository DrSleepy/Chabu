import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';

import AccountModel from './Account';
import { deleteQuestions } from './Question';

const RoomSchema = new Schema({
  id: {
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

const RoomModel = mongoose.model('Room', RoomSchema);

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

export default RoomModel;
