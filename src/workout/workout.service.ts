import { Injectable, NotFoundException } from '@nestjs/common';
import logger from '../config/logger';
import { CreateWorkout } from './workout.interface';
import { WorkoutDal } from './workout.dal';
import { Workout } from './workout.schema';

@Injectable()
export class WorkoutService {
  constructor(private workoutDal: WorkoutDal) {}

  async findAllByUserId({ userId }: { userId: string }): Promise<Workout[]> {
    logger.debug({ userId }, 'Getting workouts');
    const workouts = await this.workoutDal.findAllByUserId({
      userId,
    });
    logger.info(
      {
        workouts,
        userId,
      },
      'Got workouts',
    );
    return workouts;
  }

  async create({
    createWorkout,
  }: {
    createWorkout: CreateWorkout;
  }): Promise<Workout> {
    logger.debug(
      {
        createWorkout,
      },
      'Creating workout',
    );
    const createdWorkout = await this.workoutDal.create({
      createWorkout,
    });
    logger.info(
      {
        createWorkout,
        createdWorkout,
      },
      'Created workout',
    );
    return createdWorkout;
  }

  async findById({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Workout | null> {
    logger.debug(
      {
        workoutId,
      },
      'Getting workout by id',
    );
    const workout = await this.workoutDal.findById({
      workoutId,
    });
    logger.info(
      {
        workoutId,
        workout,
      },
      'Got workout by id',
    );
    return workout;
  }

  async findByIdOrThrow({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Workout> {
    logger.debug(
      {
        workoutId,
      },
      'Getting workout by id or throw',
    );
    const workout = await this.findById({
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
