export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserTokenPayload {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}
