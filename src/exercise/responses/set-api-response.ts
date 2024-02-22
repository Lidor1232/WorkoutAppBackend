import { Set } from '../exercise.schema';

export class SetApiResponse {
  weight: number;
  reps: number;

  constructor({ set }: { set: Set }) {
    this.reps = set.reps;
    this.weight = set.weight;
  }
}
