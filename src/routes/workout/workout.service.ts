import { Injectable } from '@nestjs/common';
import logger from '../../config/logger';
import WorkoutModel from './workout.model';
import { CreateWorkout } from './workout.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class WorkoutService {
  constructor(private userService: UserService) {}

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
    await Promise.all([
      this.userService.addWorkoutToDocByIdOrThrow({
        workoutId: createdWorkout._id,
        userId: createdWorkout.user,
      }),
    ]);
    logger.info(
      {
        workout,
      },
      'Created workout',
    );
    return createdWorkout;
  }
}
