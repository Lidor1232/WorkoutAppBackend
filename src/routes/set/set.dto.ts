import { IsNumber } from 'class-validator';

export class CreateSet {
  @IsNumber()
  weight: number;
}
