import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Set } from '../set/set.schema';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
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

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
