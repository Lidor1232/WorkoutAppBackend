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

  async findByUserId({ userId }: { userId: string }) {
    const workouts = this.workoutModel.find({
      userId,
    });
    return workouts;
  }

  async create({ createWorkout }: { createWorkout: CreateWorkout }) {
    const createdWorkout = await this.workoutModel.create(createWorkout);
    return createdWorkout;
  }

  async findById({ workoutId }: { workoutId: string }) {
    const workout = this.workoutModel.findById(workoutId);
    return workout;
  }
}
