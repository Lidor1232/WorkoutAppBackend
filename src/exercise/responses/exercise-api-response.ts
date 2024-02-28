import { Exercise } from '../exercise.schema';
import { SetApiResponse } from './set-api-response';

export class ExerciseApiResponse {
  id: string;

  name: string;

  workout: string;

  sets: SetApiResponse[];

  constructor({ exercise }: { exercise: Exercise }) {
    this.id = exercise.id;
    this.name = exercise.name;
    this.sets = exercise.sets.map(
      (set) =>
        new SetApiResponse({
          set,
        }),
    );
    this.workout = exercise.workoutId;
  }
}
