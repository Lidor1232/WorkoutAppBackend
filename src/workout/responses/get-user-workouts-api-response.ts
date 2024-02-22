import { WorkoutApiResponse } from './workout-api-response';
import { Workout } from '../workout.schema';

export class GetUserWorkoutsApiResponse {
  workouts: WorkoutApiResponse[];

  userId: string;

  constructor({ userId, workouts }: { userId: string; workouts: Workout[] }) {
    this.workouts = workouts.map(
      (workout) =>
        new WorkoutApiResponse({
          workout,
        }),
    );
    this.userId = userId;
  }
}
