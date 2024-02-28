import { Injectable, Logger } from '@nestjs/common';
import { CreateWorkout, WorkoutNotFound } from './workout.interface';
import { WorkoutDal } from './workout.dal';
import { Workout } from './workout.schema';

@Injectable()
export class WorkoutService {
  constructor(private workoutDal: WorkoutDal) {}
  private readonly logger = new Logger();

  async getAllByUserId({ userId }: { userId: string }): Promise<Workout[]> {
    this.logger.debug({ userId }, 'Getting workouts by user id');
    const workouts = await this.workoutDal.getAllByUserId({
      userId,
    });
    this.logger.log(
      {
        workouts,
        userId,
      },
      'Got workouts by user id',
    );
    return workouts;
  }

  async create({
    createWorkout,
  }: {
    createWorkout: CreateWorkout;
  }): Promise<Workout> {
    this.logger.debug(
      {
        createWorkout,
      },
      'Creating workout',
    );
    const createdWorkout = await this.workoutDal.create({
      createWorkout,
    });
    this.logger.log(
      {
        createWorkout,
        createdWorkout,
      },
      'Created workout',
    );
    return createdWorkout;
  }

  async getById({ workoutId }: { workoutId: string }): Promise<Workout | null> {
    this.logger.debug(
      {
        workoutId,
      },
      'Getting workout by id',
    );
    const workout = await this.workoutDal.getById({
      workoutId,
    });
    this.logger.log(
      {
        workoutId,
        workout,
      },
      'Got workout by id',
    );
    return workout;
  }

  async getByIdOrThrow({ workoutId }: { workoutId: string }): Promise<Workout> {
    this.logger.debug(
      {
        workoutId,
      },
      'Getting workout by id or throw',
    );
    const workout = await this.getById({
      workoutId,
    });
    if (workout === null) {
      throw new WorkoutNotFound(workoutId);
    }
    this.logger.log(
      {
        workoutId,
        workout,
      },
      'Got workout by id or throw',
    );
    return workout;
  }
}
