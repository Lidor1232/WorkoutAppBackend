export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  workouts: string[];
  password: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}
