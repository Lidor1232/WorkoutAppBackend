import { model, Schema } from 'mongoose';
import { Workout } from './workout.interface';
import { modelNames } from '../../models/model.constans';

const WorkoutSchema = new Schema<Workout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: modelNames.User,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    exercises: {
      type: Array,
      item: {
        type: Schema.Types.ObjectId,
        ref: modelNames.Exercise,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WorkoutModel = model<Workout>(modelNames.Workout, WorkoutSchema);

export default WorkoutModel;
