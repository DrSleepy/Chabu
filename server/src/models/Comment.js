import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  showUsername: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true,
    min: 1,
    max: 20000
  },
  edited: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  children: [
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

// before update, change 'edited' to true

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel;
