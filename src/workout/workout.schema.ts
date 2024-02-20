import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkoutDocument = Workout & Document;

@Schema({
  timestamps: true,
})
export class Workout {
  _id: string;

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

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
