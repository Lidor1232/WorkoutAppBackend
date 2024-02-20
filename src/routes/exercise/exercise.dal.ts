import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from './exercise.schema';
import { CreateExercise } from './exercise.interface';

@Injectable()
export class ExerciseDal {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
  ) {}

  async create({
    createExercise,
  }: {
    createExercise: CreateExercise;
  }): Promise<Exercise> {
    const createdExercise = await this.exerciseModel.create(createExercise);
    return createdExercise;
  }

  async findByWorkoutId({ workoutId }: { workoutId: string }) {
    const exercises = await this.exerciseModel.find({
      workoutId,
    });
    return exercises;
  }
}
