export interface CreateWorkout {
  date: string;
  userId: string;
}

export class WorkoutNotFound extends Error {
  constructor(workoutId: string) {
    super();

    this.message = `Workout ${workoutId} not found`;
  }
}
