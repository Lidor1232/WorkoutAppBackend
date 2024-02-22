import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkout } from './workout.dto';
import { WorkoutApiResponse } from './responses/workout-api-response';
import { AuthGuard } from '../common/guard/auth/auth.guard';
import { User } from '../decorators/user.decorator';
import { UserTokenPayload } from '../user/user.interface';
import { ExerciseService } from '../exercise/exercise.service';
import { GetUserWorkoutsApiResponse } from './responses/get-user-workouts-api-response';
import { StringService } from '../utills/data-structure/string/string.service';

@Controller('workout')
export class WorkoutController {
  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private stringService: StringService,
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createWorkout(
    @Body() body: CreateWorkout,
    @User() user: UserTokenPayload,
  ) {
    const workout = await this.workoutService.create({
      createWorkout: {
        userId: user._id,
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

  @Get(':workoutId/details')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getWorkoutDetails(@Param() params: { workoutId: string }) {
    const workout = await this.workoutService.findByIdOrThrow({
      workoutId: params.workoutId,
    });
    return new WorkoutApiResponse({
      workout,
    });
  }

  @Get('user/:userId/workouts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUserWorkouts(
    @User() user: UserTokenPayload,
    @Param()
    params: {
      userId: string;
    },
  ) {
    this.stringService.stringsEqualOrThrow({
      string1: user._id,
      string2: params.userId,
    });
    const workouts = await this.workoutService.findAllByUserId({
      userId: params.userId,
    });
    return new GetUserWorkoutsApiResponse({
      workouts,
      userId: params.userId,
    });
  }
}
