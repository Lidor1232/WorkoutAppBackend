import { model, Schema } from 'mongoose';
import { Exercise } from './exercise.interface';
import { modelNames } from '../../models/model.constans';

const ExerciseSchema = new Schema<Exercise>(
  {
    name: {
      type: String,
      required: true,
      min: 1,
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: modelNames.Workout,
      required: true,
    },
    sets: {
      type: Array,
      items: {
        type: Schema.Types.ObjectId,
        ref: modelNames.Set,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ExerciseModel = model<Exercise>(modelNames.Exercise, ExerciseSchema);

export default ExerciseModel;
