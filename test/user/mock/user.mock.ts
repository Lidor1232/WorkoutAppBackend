import { User } from '../../../src/user/user.schema';

export const userMock: Omit<User, '_id'> = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  userName: 'testUserName123',
  password: 'testPassword123',
};
