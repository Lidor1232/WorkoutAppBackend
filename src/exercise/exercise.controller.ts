import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guard/auth/auth.guard';
import { ExerciseService } from './exercise.service';
import { GetWorkoutExercisesApiResponse } from './responses/get-workout-exercises-api-response';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('/workout/:workoutId/exercises')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getWorkoutExercises(@Param() params: { workoutId: string }) {
    const exercises = await this.exerciseService.getAllByWorkoutId({
      workoutId: params.workoutId,
    });
    return new GetWorkoutExercisesApiResponse({
      workoutId: params.workoutId,
      exercises,
    });
  }
}
