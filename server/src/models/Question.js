import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import moment from 'moment';

import AccountModel from './Account';
import { deleteComments } from './Comment';

const QuestionSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true,
    min: 20,
    max: 100
  },
  text: {
    type: String,
    default: null,
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
  likedBy: [
    {
      type: String,
      ref: 'Account'
    }
  ],
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

// DO NOT DELETE: mongoose index doesnt work. index must be created on mongodb manually
QuestionSchema.index({ title: 'text' });

QuestionSchema.set('toObject', { getters: true });

QuestionSchema.virtual('timeAgo').get(function() {
  return moment(this.date).from(new Date());
});

export function deleteQuestions() {
  this.questions.forEach(async questionID => {
    const question = await QuestionModel.findById(questionID); //eslint-disable-line
    await AccountModel.findByIdAndUpdate(question.account, { $pull: { createdQuestions: question._id } });
    await question.remove();
  });
}

QuestionSchema.pre('remove', async function(next) {
  deleteComments.call(this);
  await AccountModel.findByIdAndUpdate(this.account, { $pull: { createdQuestions: this._id } });
  next();
});

const QuestionModel = mongoose.model('Question', QuestionSchema);
export default QuestionModel;
