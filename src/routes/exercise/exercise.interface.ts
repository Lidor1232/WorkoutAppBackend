export interface Exercise {
  _id: string;
  name: string;
  workout: string;
  sets: string[];
}

export interface CreateExercise {
  name: string;
  workout: string;
}
