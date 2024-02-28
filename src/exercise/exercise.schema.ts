import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Set {
  @Prop({
    type: Number,
    required: true,
  })
  weight: number;

  @Prop({
    type: Number,
    required: true,
  })
  reps: number;
}

@Schema({
  timestamps: true,
})
export class Exercise {
  _id: Types.ObjectId;

  id: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  workoutId: string;

  @Prop({
    type: [Set],
    required: true,
  })
  sets: Set[];
}

const ExerciseSchema = SchemaFactory.createForClass(Exercise);

ExerciseSchema.virtual('id').get(function (this: Exercise) {
  return this._id.toString();
});

export { ExerciseSchema };
