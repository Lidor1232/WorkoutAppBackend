import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkout } from './workout.dto';
import { WorkoutApiResponse } from './responses/workout-api-response';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../../decorators/user.decorator';
import { UserTokenPayload } from '../user/user.interface';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createWorkout(
    @Body() body: CreateWorkout,
    @User() user: UserTokenPayload,
  ) {
    const workout = await this.workoutService.createDoc({
      workout: {
        user: user._id,
        date: body.date,
      },
    });
    return new WorkoutApiResponse({
      workout,
    });
  }
}
