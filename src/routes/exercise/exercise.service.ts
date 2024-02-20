import { Injectable } from '@nestjs/common';
import { CreateExercise } from './exercise.interface';
import logger from '../../config/logger';
import { ExerciseDal } from './exercise.dal';

@Injectable()
export class ExerciseService {
  constructor(private exerciseDal: ExerciseDal) {}

  async createDoc({ exercise }: { exercise: CreateExercise }) {
    logger.debug(
      {
        exercise,
      },
      'Creating exercise',
    );
    const createdExercise = await this.exerciseDal.create({
      createExercise: exercise,
    });
    logger.info(
      {
        exercise,
        createdExercise,
      },
      'Created exercise',
    );
    return createdExercise;
  }

  async getDocsByWorkoutId({ workoutId }: { workoutId: string }) {
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
