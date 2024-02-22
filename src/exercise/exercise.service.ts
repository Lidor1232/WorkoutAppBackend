import { Injectable } from '@nestjs/common';
import { CreateExercise } from './exercise.interface';
import { ExerciseDal } from './exercise.dal';
import { Exercise } from './exercise.schema';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class ExerciseService {
  constructor(
    private exerciseDal: ExerciseDal,
    private loggerService: LoggerService,
  ) {}

  async create({
    createExercise,
  }: {
    createExercise: CreateExercise;
  }): Promise<Exercise> {
    this.loggerService.logger.debug(
      {
        createExercise,
      },
      'Creating exercise',
    );
    const createdExercise = await this.exerciseDal.create({
      createExercise,
    });
    this.loggerService.logger.info(
      {
        createExercise,
        createdExercise,
      },
      'Created exercise',
    );
    return createdExercise;
  }

  async findAllByWorkoutId({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Exercise[]> {
    this.loggerService.logger.debug(
      {
        workoutId,
      },
      'Getting exercises by workout id',
    );
    const exercises = await this.exerciseDal.findByWorkoutId({
      workoutId,
    });
    this.loggerService.logger.info(
      {
        workoutId,
        exercises,
      },
      'Got exercises by workout id',
    );
    return exercises;
  }
}
