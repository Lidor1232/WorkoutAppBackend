import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
