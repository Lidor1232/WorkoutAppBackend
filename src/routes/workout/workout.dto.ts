import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateExercise } from '../exercise/exercise.dto';
import { Type } from 'class-transformer';

export class CreateWorkout {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateExercise)
  exercises: CreateExercise[];
}
