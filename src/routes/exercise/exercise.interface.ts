export interface CreateSet {
  reps: number;
  weight: number;
}

export interface CreateExercise {
  name: string;
  workoutId: string;
  sets: CreateSet[];
}
