import { Test } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import { LoggerService } from '../../common/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from '../../config/environment.config';

describe('BcryptService', function () {
  let bcryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [environmentConfig],
        }),
      ],
      providers: [BcryptService, LoggerService],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isPasswordMatchHash', function () {
    it('', async function () {
      const payload = await bcryptService.isPasswordMatchHash({
        password: 'lidor123',
        hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      });
      expect(payload).toBe(true);
    });

    it('', async function () {
      const payload = await bcryptService.isPasswordMatchHash({
        password: 'lidor1',
        hash: '$2a$10$Ph2LQ0YOoL3oDF0c3CjBZemj162jggRkzBxNJGp.emWi6aP/82ste',
      });
      expect(payload).toBe(false);
    });
  });
});
