export interface CreateSet {
  reps: number;
  weight: number;
}

export interface CreateExercise {
  name: string;
  workout: string;
  sets: CreateSet[];
}
