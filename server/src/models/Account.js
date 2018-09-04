import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const AccountSchema = new Schema({
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
  joinedRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  createdRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  createdQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  createdComments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const AccountModel = mongoose.model('Account', AccountSchema);

// plugins
AccountSchema.plugin(uniqueValidator, { message: '{VALUE} already taken' });

// hooks
// eslint-disable-next-line
AccountSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = AccountSchema.methods.encryptPassword(this.password);
  }
  next();
});

// methods
AccountSchema.methods.encryptPassword = password => hashSync(password, genSaltSync(10));
AccountSchema.methods.comparePassword = (plainPassword, hashedPassword) => compareSync(plainPassword, hashedPassword);

export default AccountModel;
