import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

import AccountModel from './Account';
import { deleteComments } from './Comment';

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

const QuestionModel = mongoose.model('Question', QuestionSchema);

QuestionSchema.set('toObject', { getters: true });

// DO NOT DELETE: mongoose index doesnt work. index must be created on mongodb manually
QuestionSchema.index({ title: 'text' });

QuestionSchema.virtual('timeAgo').get(function() {
  return moment(this.date).from(new Date());
});

export function deleteQuestions() {
  this.questions.forEach(async questionID => {
    const question = await QuestionModel.findById(questionID);
    await AccountModel.findByIdAndUpdate(question.account, { $pull: { createdQuestions: question._id } });
    await question.remove();
  });
}

QuestionSchema.pre('remove', async function(next) {
  deleteComments.call(this);
  await AccountModel.findByIdAndUpdate(this.account, { $pull: { createdQuestions: this._id } });
  next();
});

export default QuestionModel;
