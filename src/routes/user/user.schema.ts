import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  _id: string;

  @Prop({
    type: String,
    required: true,
    min: 1,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    min: 1,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    min: 1,
    unique: true,
  })
  userName: string;

  @Prop({
    type: String,
    required: true,
    min: 1,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

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
