import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

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

// eslint-disable-next-line
CommentSchema.virtual('dateAgo').get(function() {
  return moment(this.date).from(new Date());
});

CommentSchema.set('toObject', { getters: true });

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel;
