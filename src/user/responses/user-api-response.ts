import { User } from '../user.schema';

export class UserApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;

  constructor({ user }: { user: User }) {
    this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
  }
}
