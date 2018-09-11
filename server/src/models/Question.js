import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const QuestionSchema = new Schema(
  {
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
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// Do not delete: mongoose index doesnt work. index must be created on mongodb manually
QuestionSchema.index({ title: 'text' });

// eslint-disable-next-line
QuestionSchema.virtual('dateAgo').get(function() {
  return moment(this.date).from(new Date());
});

QuestionSchema.set('toObject', { getters: true });

const QuestionModel = mongoose.model('Question', QuestionSchema);
export default QuestionModel;
