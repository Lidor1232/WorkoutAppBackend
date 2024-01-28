import { Injectable, NotFoundException } from '@nestjs/common';
import logger from '../../config/logger';
import WorkoutModel from './workout.model';
import { CreateWorkout } from './workout.interface';

@Injectable()
export class WorkoutService {
  constructor() {}

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

  async createDoc({ workout }: { workout: CreateWorkout }) {
    logger.debug(
      {
        workout,
      },
      'Creating workout',
    );
    const createdWorkout = await WorkoutModel.create(workout);
    logger.info(
      {
        workout,
      },
      'Created workout',
    );
    return createdWorkout;
  }

  async getDocById({ workoutId }: { workoutId: string }) {
    logger.debug(
      {
        workoutId,
      },
      'Getting workout by id',
    );
    const workout = await WorkoutModel.findById(workoutId);
    logger.info(
      {
        workoutId,
        workout,
      },
      'Got workout by id',
    );
    return workout;
  }

  async getDocByIdOrThrow({ workoutId }: { workoutId: string }) {
    logger.debug(
      {
        workoutId,
      },
      'Getting workout by id or throw',
    );
    const workout = await this.getDocById({
      workoutId,
    });
    if (workout === null) {
      throw new NotFoundException('Workout not found');
    }
    logger.info(
      {
        workoutId,
        workout,
      },
      'Got workout by id or throw',
    );
    return workout;
  }
}
