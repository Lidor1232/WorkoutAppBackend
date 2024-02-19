import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SetDocument = Set & Document;

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

export const SetSchema = SchemaFactory.createForClass(Set);
