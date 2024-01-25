import { Test } from '@nestjs/testing';
import { BcryptService } from './bcrypt';

describe('BcryptService', () => {
  let bcryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if the password matches the hash', async () => {
    await expect(
      bcryptService.isPasswordMatchHash({
        password: 'lidor123',
        hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      }),
    ).resolves.toBe(true);
  });

  it('should return false if the password does not match the hash', async () => {
    await expect(
      bcryptService.isPasswordMatchHash({
        password: 'lidor1',
        hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      }),
    ).resolves.toBe(false);
  });
});
