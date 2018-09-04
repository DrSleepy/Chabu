import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 20,
    max: 200
  },
  text: {
    type: String,
    default: null,
    min: 5,
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
  likes: {
    type: Number,
    default: 0
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

const QuestionModel = mongoose.model('Question', QuestionSchema);
export default QuestionModel;
