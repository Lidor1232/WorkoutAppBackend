import { Schema, model } from 'mongoose';
import { modelNames } from '../../models/constans/constans';
import { User } from './user.interface';
import * as bcrypt from 'bcryptjs';

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
    min: 1,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 1,
  },
  workouts: {
    type: Array,
    item: {
      type: Schema.Types.ObjectId,
      ref: modelNames.Workout,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const saltRounds = 10;
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    return next();
  });
});

const UserModel = model<User>(modelNames.User, UserSchema);

export default UserModel;
