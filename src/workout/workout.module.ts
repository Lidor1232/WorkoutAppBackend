import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { JWTModule } from '../utills/jwt/jwt.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { WorkoutDal } from './workout.dal';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './workout.schema';

@Module({
  imports: [
    JWTModule,
    ExerciseModule,
    MongooseModule.forFeature([
      {
        name: Workout.name,
        schema: WorkoutSchema,
      },
    ]),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutDal],
})
export class WorkoutModule {}
