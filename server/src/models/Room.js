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
    max: 40
  },
  creator: {
    type: String,
    default: null,
    min: 3,
    max: 15
  },
  date: {
    type: Date,
    default: Date.now
  },
  locked: {
    type: Boolean,
    default: false
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

RoomSchema.pre('remove', async function(next) {
  deleteQuestions.call(this);

  const pullRoomFromMembers = AccountModel.updateMany(
    { _id: { $in: this.members } },
    { $pull: { joinedRooms: this._id } }
  ).exec();

  const pullRoomFromCreatedRooms = AccountModel.findByIdAndUpdate(this.account, {
    $pull: { createdRooms: this._id }
  }).exec();

  await Promise.all([pullRoomFromMembers, pullRoomFromCreatedRooms]);

  next();
});

const RoomModel = mongoose.model('Room', RoomSchema);
export default RoomModel;
