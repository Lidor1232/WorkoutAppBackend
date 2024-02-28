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
    return this.exerciseModel.create(createExercise);
  }

  async getByWorkoutId({
    workoutId,
  }: {
    workoutId: string;
  }): Promise<Exercise[]> {
    return this.exerciseModel.find({
      workoutId,
    });
  }
}
