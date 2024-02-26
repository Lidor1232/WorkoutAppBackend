import { Workout } from '../../../src/workout/workout.schema';

export const workoutMock: Omit<Workout, '_id' | 'userId'> = {
  date: '2024-02-22T15:26:52.705Z',
};
