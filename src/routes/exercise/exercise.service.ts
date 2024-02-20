import { Injectable } from '@nestjs/common';
import { CreateExercise } from './exercise.interface';
import logger from '../../config/logger';
import { ExerciseDal } from './exercise.dal';
import { Exercise } from './exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(private exerciseDal: ExerciseDal) {}

  async create({
    createExercise,
  }: {
    createExercise: CreateExercise;
  }): Promise<Exercise> {
    logger.debug(
      {
        createExercise,
      },
      'Creating exercise',
    );
    const createdExercise = await this.exerciseDal.create({
      createExercise,
    });
    logger.info(
      {
        createExercise,
        createdExercise,
      },
      'Created exercise',
    );
    return createdExercise;
  }

  async findAllByWorkoutId({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Exercise[]> {
    logger.debug(
      {
        workoutId,
      },
      'Getting exercises by workout id',
    );
    const exercises = await this.exerciseDal.findByWorkoutId({
      workoutId,
    });
    logger.info(
      {
        workoutId,
        exercises,
      },
      'Got exercises by workout id',
    );
    return exercises;
  }
}
