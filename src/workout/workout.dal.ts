import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout } from './workout.schema';
import { CreateWorkout } from './workout.interface';

@Injectable()
export class WorkoutDal {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
  ) {}

  async getAllByUserId({ userId }: { userId: string }): Promise<Workout[]> {
    return this.workoutModel.find({
      userId,
    });
  }

  async create({
    createWorkout,
  }: {
    createWorkout: CreateWorkout;
  }): Promise<Workout> {
    return this.workoutModel.create(createWorkout);
  }

  async getById({ workoutId }: { workoutId: string }): Promise<Workout | null> {
    return this.workoutModel.findById(workoutId);
  }
}
