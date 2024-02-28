import { Workout } from '../workout.schema';

export class WorkoutApiResponse {
  id: string;
  date: string;

  constructor({ workout }: { workout: Workout }) {
    this.id = workout.id;
    this.date = workout.date;
  }
}
