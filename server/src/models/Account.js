import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import shortid from 'shortid';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const AccountSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100
  },
  email: {
    type: String,
    default: null,
    min: 4,
    max: 50
  },
  showUsername: {
    type: Boolean,
    default: false
  },
  likedQuestions: [
    {
      type: String,
      ref: 'Question'
    }
  ],
  joinedRooms: [
    {
      type: String,
      ref: 'Room'
    }
  ],
  createdRooms: [
    {
      type: String,
      ref: 'Room'
    }
  ],
  createdQuestions: [
    {
      type: String,
      ref: 'Question'
    }
  ],
  createdComments: [
    {
      type: String,
      ref: 'Comment'
    }
  ]
});

// DO NOT DELETE: mongoose index doesnt work. index must be created on mongodb manually
AccountSchema.index([{ email: 1 }, { username: 1 }]);

AccountSchema.plugin(uniqueValidator, { message: '{VALUE} already taken' });

AccountSchema.methods.encryptPassword = password => hashSync(password, genSaltSync(10));
AccountSchema.methods.isValidPassword = (plainPassword, hashedPassword) => compareSync(plainPassword, hashedPassword);

AccountSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }
  next();
});

const AccountModel = mongoose.model('Account', AccountSchema);
export default AccountModel;
