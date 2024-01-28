export interface Workout {
  _id: string;
  user: string;
  date: string;
}

export interface CreateWorkout {
  date: string;
  user: string;
}
