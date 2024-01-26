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

  async addExerciseToWorkoutByIdOrThrow({
    exerciseId,
    workoutId,
  }: {
    workoutId: string;
    exerciseId: string;
  }) {
    logger.debug(
      {
        exerciseId,
        workoutId,
      },
      'Adding exercise to workout by id or throw',
    );
    const updatedResult = await WorkoutModel.updateOne(
      {
        _id: workoutId,
      },
      {
        $push: {
          exercises: exerciseId,
        },
      },
    );
    if (updatedResult.nModified === 0) {
      throw new Error('Exercise not added to workout');
    }
    logger.info(
      {
        exerciseId,
        workoutId,
      },
      'Added exercise to workout by id or throw',
    );
  }
}
