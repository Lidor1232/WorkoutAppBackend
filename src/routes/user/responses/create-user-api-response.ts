import { UserApiResponse } from './user-api-response';
import { User } from '../user.interface';

export class CreateUserApiResponse {
  user: UserApiResponse;

  token: string;

  constructor({ user, token }: { user: User; token: string }) {
    this.user = new UserApiResponse({ user });
    this.token = token;
  }
}
