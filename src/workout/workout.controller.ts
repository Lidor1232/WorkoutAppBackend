import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkout } from './workout.dto';
import { WorkoutApiResponse } from './responses/workout-api-response';
import { AuthGuard } from '../common/guard/auth/auth.guard';
import { UserTokenPayload } from '../user/user.interface';
import { ExerciseService } from '../exercise/exercise.service';
import { GetUserWorkoutsApiResponse } from './responses/get-user-workouts-api-response';

@Controller('workout')
export class WorkoutController {
  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createWorkout(
    @Body() body: CreateWorkout,
    @Request()
    req: {
      user: UserTokenPayload;
    },
  ) {
    const workout = await this.workoutService.create({
      createWorkout: {
        userId: req.user._id,
        date: body.date,
      },
    });
    await Promise.all(
      body.exercises.map((exercise) =>
        this.exerciseService.create({
          createExercise: {
            ...exercise,
            workoutId: workout._id,
          },
        }),
      ),
    );
    return new WorkoutApiResponse({
      workout,
    });
  }

  @Get('/:workoutId/details')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getWorkoutDetails(@Param() params: { workoutId: string }) {
    try {
      const workout = await this.workoutService.findByIdOrThrow({
        workoutId: params.workoutId,
      });
      return new WorkoutApiResponse({
        workout,
      });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get('/user/:userId/workouts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUserWorkouts(
    @Request()
    req: {
      user: UserTokenPayload;
    },
  ) {
    const workouts = await this.workoutService.findAllByUserId({
      userId: req.user._id,
    });
    return new GetUserWorkoutsApiResponse({
      workouts,
      userId: req.user._id,
    });
  }
}
