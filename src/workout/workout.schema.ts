import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({
  timestamps: true,
})
export class Workout {
  _id: Types.ObjectId;

  id: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: string;
}

const WorkoutSchema = SchemaFactory.createForClass(Workout);

WorkoutSchema.virtual('id').get(function (this: Workout) {
  return this._id.toString();
});

export { WorkoutSchema };
