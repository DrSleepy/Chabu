import { Schema, model, ObjectId } from 'mongoose';

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: 20000,
    min: 1
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
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

const CommentModel = model('Comment', CommentSchema);

export default CommentModel;
