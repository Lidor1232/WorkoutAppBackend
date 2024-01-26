import { Workout } from '../workout.interface';

export class WorkoutApiResponse {
  _id: string;
  date: string;

  constructor({ workout }: { workout: Workout }) {
    this._id = workout._id;
    this.date = workout.date;
  }
}
