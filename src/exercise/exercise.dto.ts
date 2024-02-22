import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSet {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(0)
  reps: number;
}

export class CreateExercise {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateSet)
  sets: CreateSet[];
}
