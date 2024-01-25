import { Injectable } from '@nestjs/common';
import logger from '../../config/logger';
import WorkoutModel from './workout.model';

@Injectable()
export class WorkoutService {
  async getDocsByUserId({ userId }: { userId: string }) {
    logger.debug({}, '' + 'Getting workouts');
    const workouts = await WorkoutModel.find({
      user: userId,
    });
    logger.info(
      {
        workouts,
      },
      'Got workouts',
    );
    return workouts;
  }
}
