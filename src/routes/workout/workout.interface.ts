export interface Workout {
  _id: string;
  user: string;
  date: string;
  exercises: string[];
}

export interface CreateWorkout {
  date: string;
  user: string;
}
