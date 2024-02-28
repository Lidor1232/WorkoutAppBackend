import { Injectable, Logger } from '@nestjs/common';
import { CreateExercise } from './exercise.interface';
import { ExerciseDal } from './exercise.dal';
import { Exercise } from './exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(private exerciseDal: ExerciseDal) {}
  private readonly logger = new Logger();

  async create({
    createExercise,
  }: {
    createExercise: CreateExercise;
  }): Promise<Exercise> {
    this.logger.debug(
      {
        createExercise,
      },
      'Creating exercise',
    );
    const createdExercise = await this.exerciseDal.create({
      createExercise,
    });
    this.logger.log(
      {
        createExercise,
        createdExercise,
      },
      'Created exercise',
    );
    return createdExercise;
  }

  async getAllByWorkoutId({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Exercise[]> {
    this.logger.debug(
      {
        workoutId,
      },
      'Getting exercises by workout id',
    );
    const exercises = await this.exerciseDal.getByWorkoutId({
      workoutId,
    });
    this.logger.log(
      {
        workoutId,
        exercises,
      },
      'Got exercises by workout id',
    );
    return exercises;
  }
}
