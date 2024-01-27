import { IsArray, IsString } from 'class-validator';
import { CreateExercise } from '../exercise/exercise.dto';

export class CreateWorkout {
  @IsString()
  date: string;

  @IsArray()
  exercises: CreateExercise[];
}
