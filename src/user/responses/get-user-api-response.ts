import { User } from '../user.dto';

export class GetUserApiResponse {
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
