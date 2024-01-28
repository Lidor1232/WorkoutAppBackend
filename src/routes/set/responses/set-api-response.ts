import { Set } from '../set.interface';

export class SetApiResponse {
  weight: number;
  reps: number;

  constructor({ set }: { set: Set }) {
    this.reps = set.reps;
    this.weight = set.weight;
  }
}
