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
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

const CommentModel = model('Comment', CommentSchema);

export default CommentModel;
