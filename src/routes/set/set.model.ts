import { model, Schema } from 'mongoose';
import { modelNames } from '../../models/model.constans';
import { Set } from './set.interface';

const SetSchema = new Schema<Set>(
  {
    exercise: {
      type: Schema.Types.ObjectId,
      ref: modelNames.Exercise,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const SetModel = model<Set>(modelNames.Set, SetSchema);

export default SetModel;
