import { SetApiResponse } from '../../set/responses/set-api-response';
import { Exercise } from '../exercise.interface';

export class ExerciseApiResponse {
  _id: string;

  name: string;

  workout: string;

  sets: SetApiResponse[];

  constructor({ exercise }: { exercise: Exercise }) {
    this._id = exercise._id;
    this.name = exercise.name;
    this.sets = exercise.sets.map(
      (set) =>
        new SetApiResponse({
          set,
        }),
    );
    this.workout = exercise.workout;
  }
}
