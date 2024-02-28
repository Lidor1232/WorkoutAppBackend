import { User } from '../user.schema';

export class UserApiResponse {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;

  constructor({ user }: { user: User }) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
  }
}
