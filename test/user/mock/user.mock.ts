import { User } from '../../../src/user/user.schema';

export const userMock: Omit<User, '_id'> = {
  id: '65dcaf6412a35fb2fc93aaa9',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  userName: 'testUserName123',
  password: 'testPassword123',
};
