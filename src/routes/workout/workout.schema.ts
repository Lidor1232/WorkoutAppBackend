import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkoutDocument = Workout & Document;

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
