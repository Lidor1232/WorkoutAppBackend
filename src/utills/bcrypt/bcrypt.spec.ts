import { isPasswordMatchHash } from './bcrypt';

test('isPasswordMatchHash', function () {
  expect(
    isPasswordMatchHash({
      hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      password: 'lidor123',
    }),
  ).resolves.toBe(true);
  expect(
    isPasswordMatchHash({
      hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      password: 'lidor1',
    }),
  ).resolves.toBe(false);
});
