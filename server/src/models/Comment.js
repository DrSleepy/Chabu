import { Schema, model, ObjectId } from 'mongoose';

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 20000
  },
  date: {
    type: Date,
    default: Date.now
  },
  children: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ],
  account: {
    type: ObjectId,
    ref: 'Account'
  }
});

const CommentModel = model('Comment', CommentSchema);

export default CommentModel;
