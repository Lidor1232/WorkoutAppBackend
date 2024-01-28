import { Workout } from '../../workout/workout.interface';
import { WorkoutApiResponse } from '../../workout/responses/workout-api-response';

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
