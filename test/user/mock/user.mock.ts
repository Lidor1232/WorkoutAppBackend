import { User } from '../../../src/user/user.schema';

export const userMock: Omit<User, '_id'> = {
  id: '65df0b176f17ecc8896d0df1',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  userName: 'testUserName123',
  password: 'testPassword123',
};
