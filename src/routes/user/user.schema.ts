import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
