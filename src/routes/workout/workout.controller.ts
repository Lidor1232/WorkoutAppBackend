import { Controller } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}
}
