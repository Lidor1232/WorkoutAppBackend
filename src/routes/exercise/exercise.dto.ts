import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSet } from '../set/set.dto';

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
