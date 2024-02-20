import { ExerciseApiResponse } from './exercise-api-response';
import { Exercise } from '../exercise.schema';

export class GetWorkoutExercisesApiResponse {
  workoutId: string;

  exercises: ExerciseApiResponse[];

  constructor({
    exercises,
    workoutId,
  }: {
    exercises: Exercise[];
    workoutId: string;
  }) {
    this.workoutId = workoutId;
    this.exercises = exercises.map(
      (exercise) =>
        new ExerciseApiResponse({
          exercise,
        }),
    );
  }
}
