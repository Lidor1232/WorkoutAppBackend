import { IsDate, IsMongoId } from 'class-validator';

export class CreateWorkout {
  @IsDate()
  date: string;

  @IsMongoId()
  user: string;
}
