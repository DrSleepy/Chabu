import { Schema, model, ObjectId } from 'mongoose';

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 200,
    min: 20
  },
  text: {
    type: String,
    required: false,
    max: 20000,
    min: 50
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

const QuestionModel = model('Question', QuestionSchema);

export default QuestionModel;
