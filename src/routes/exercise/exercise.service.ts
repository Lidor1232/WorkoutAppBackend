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

  async addSetToDocByIdOrThrow({
    exerciseId,
    setId,
  }: {
    exerciseId: string;
    setId: string;
  }): Promise<void> {
    logger.debug(
      {
        exerciseId,
        setId,
      },
      'Adding set to exercise by id or throw',
    );
    const updatedResult = await ExerciseModel.updateOne(
      {
        _id: exerciseId,
      },
      {
        $push: {
          sets: setId,
        },
      },
    );
    if (updatedResult.nModified === 0) {
      throw new Error('Set no added to exercise');
    }
    logger.info(
      {
        setId,
        exerciseId,
      },
      'Added set to exercise by id or throw',
    );
  }
}
