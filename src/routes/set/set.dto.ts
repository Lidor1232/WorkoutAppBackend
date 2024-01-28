import { IsNumber, Min } from 'class-validator';

export class CreateSet {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(0)
  reps: number;
}
