export interface UserTokenPayload {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export class UserNotFound extends Error {
  constructor() {
    super();

    this.message = `User not found`;
  }
}

export class InvalidUserPassword extends Error {
  constructor() {
    super();

    this.message = 'Invalid user password';
  }
}

export class UserAlreadyExist extends Error {
  constructor() {
    super();

    this.message = 'User already exists';
  }
}
