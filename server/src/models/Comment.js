import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';

import AccountModel from './Account';

const CommentSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  text: {
    type: String,
    required: true,
    min: 1,
    max: 20000
  },
  showUsername: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  edited: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: String,
      ref: 'Comment'
    }
  ],
  account: {
    type: String,
    ref: 'Account'
  }
});

CommentSchema.set('toObject', { getters: true });

CommentSchema.virtual('timeAgo').get(function() {
  return moment(this.date).from(new Date());
});

export function deleteComments() {
  this.comments.forEach(async commentID => {
    const comment = await CommentModel.findById(commentID); //eslint-disable-line
    await AccountModel.findByIdAndUpdate(comment.account, { $pull: { createdComments: comment._id } });
    await comment.remove();
  });
}

CommentSchema.pre('remove', function(next) {
  deleteComments.call(this);
  next();
});

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel;
