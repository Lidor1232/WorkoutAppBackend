import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkout } from './workout.interface';
import { WorkoutDal } from './workout.dal';
import { Workout } from './workout.schema';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class WorkoutService {
  constructor(
    private workoutDal: WorkoutDal,
    private loggerService: LoggerService,
  ) {}

  async findAllByUserId({ userId }: { userId: string }): Promise<Workout[]> {
    this.loggerService.logger.debug({ userId }, 'Getting workouts');
    const workouts = await this.workoutDal.findAllByUserId({
      userId,
    });
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
      {
        createWorkout,
      },
      'Creating workout',
    );
    const createdWorkout = await this.workoutDal.create({
      createWorkout,
    });
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
      {
        workoutId,
      },
      'Getting workout by id',
    );
    const workout = await this.workoutDal.findById({
      workoutId,
    });
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
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
    this.loggerService.logger.info(
      {
        workoutId,
        workout,
      },
      'Got workout by id or throw',
    );
    return workout;
  }
}
