import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { JWTModule } from '../../utills/jwt/jwt.module';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
  imports: [JWTModule, ExerciseModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
