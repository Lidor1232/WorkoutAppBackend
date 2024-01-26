import { Injectable } from '@nestjs/common';
import { CreateSet } from './set.interface';
import logger from '../../config/logger';
import SetModel from './set.model';
import { ExerciseService } from '../exercise/exercise.service';

@Injectable()
export class SetService {
  constructor(private exerciseService: ExerciseService) {}

  async createDoc({ set }: { set: CreateSet }) {
    logger.debug(
      {
        set,
      },
      'Creating set',
    );
    const createdSet = await SetModel.create(set);
    await Promise.all([
      this.exerciseService.addSetToDocByIdOrThrow({
        exerciseId: createdSet.exercise,
        setId: createdSet._id,
      }),
    ]);
    logger.info(
      {
        set,
        createdSet,
      },
      'Created set',
    );
    return createdSet;
  }
}
