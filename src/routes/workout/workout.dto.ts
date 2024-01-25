import { IsString } from 'class-validator';

export class CreateWorkout {
  @IsString()
  date: string;
}
