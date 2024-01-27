import { Injectable } from '@nestjs/common';
import { CreateExercise } from './exercise.interface';
import logger from '../../config/logger';
import ExerciseModel from './exercise.model';

@Injectable()
export class ExerciseService {
  constructor() {}

  async createDoc({ exercise }: { exercise: CreateExercise }) {
    logger.debug(
      {
        exercise,
      },
      'Creating exercise',
    );
    const createdExercise = await ExerciseModel.create(exercise);
    logger.info(
      {
        exercise,
        createdExercise,
      },
      'Created exercise',
    );
    return createdExercise;
  }
}
