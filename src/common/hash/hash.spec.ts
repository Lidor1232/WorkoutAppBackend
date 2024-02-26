import { Test } from '@nestjs/testing';
import { HashService } from './hash.service';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from '../../config/environment.config';
import { hashMock } from './hash.mock';

describe('HashService', function () {
  let hashService: HashService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [environmentConfig],
        }),
      ],
      providers: [HashService],
    }).compile();

    hashService = module.get(HashService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isDataMatchHash', function () {
    it('', async function () {
      const payload = await hashService.compare({
        data: hashMock.correctData,
        encrypted: hashMock.encrypted,
      });
      expect(payload).toBe(true);
    });

    it('', async function () {
      const payload = await hashService.compare({
        data: hashMock.wrongData,
        encrypted: hashMock.encrypted,
      });
      expect(payload).toBe(false);
    });
  });
});
