import { Set } from '../set/set.interface';

export interface Exercise {
  _id: string;
  name: string;
  workout: string;
  sets: Set[];
}

export interface CreateExercise {
  name: string;
  workout: string;
  sets: Set[];
}
