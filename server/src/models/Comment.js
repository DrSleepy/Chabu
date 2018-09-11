import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

import AccountModel from './Account';

const CommentSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

const CommentModel = mongoose.model('Comment', CommentSchema);

CommentSchema.set('toObject', { getters: true });

CommentSchema.virtual('timeAgo').get(function() {
  return moment(this.date).from(new Date());
});

export function deleteComments() {
  this.comments.forEach(async commentID => {
    const comment = await CommentModel.findById(commentID);
    await AccountModel.findByIdAndUpdate(comment.account, { $pull: { createdComments: comment._id } });
    await comment.remove();
  });
}

CommentSchema.pre('remove', function(next) {
  deleteComments.call(this);
  next();
});

export default CommentModel;
