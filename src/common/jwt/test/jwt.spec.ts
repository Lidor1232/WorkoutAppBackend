import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getJwtConfig } from '../../../config/environment.config';
import { JWTService } from '../jwt.service';
import { UnauthorizedException } from '@nestjs/common';
import { userMock } from '../../../../test/user/mock/user.mock';
import { jwtMock } from './jwt.mock';

describe('JWTService', function () {
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [getJwtConfig],
        }),
      ],
      providers: [JWTService],
    }).compile();

    jwtService = module.get<JWTService>(JWTService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserToken', function () {
    it('', async function () {
      const payload = jwtService.createUserToken({
        user: {
          userName: userMock.userName,
          _id: userMock._id,
          firstName: userMock.firstName,
          lastName: userMock.lastName,
        },
      });
      expect(typeof payload).toBe('string');
    });
  });

  describe('verifyUserToken', function () {
    it('', async function () {
      const payload = jwtService.verifyUserToken({
        token: jwtMock.token,
      });
      const result = {
        _id: userMock._id,
        userName: userMock.userName,
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        iat: 1708508177,
      };
      expect(payload).toMatchObject(result);
    });

    it('', async function () {
      const payload = jwtService.verifyUserToken({
        token: jwtMock.token,
      });
      expect(payload).toBe(null);
    });
  });

  describe('verifyUserTokenOrThrow', function () {
    it('', async function () {
      const payload = jwtService.verifyUserTokenOrThrow({
        token: jwtMock.token,
      });
      const result = {
        _id: userMock._id,
        userName: userMock.userName,
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        iat: 1708508177,
      };
      expect(payload).toMatchObject(result);
    });

    it('', function () {
      expect(function () {
        jwtService.verifyUserTokenOrThrow({
          token: jwtMock.token,
        });
      }).toThrow(UnauthorizedException);
    });
  });

  describe('extractJwtFromAuthorizationHeader', function () {
    it('', async function () {
      expect(function () {
        jwtService.extractJwtFromAuthorizationHeader('');
      }).toThrow(UnauthorizedException);
    });

    it('', async function () {
      expect(function () {
        jwtService.extractJwtFromAuthorizationHeader(jwtMock.token);
      }).toThrow(UnauthorizedException);
    });

    it('', async function () {
      const payload = jwtService.extractJwtFromAuthorizationHeader(
        `Bearer ${jwtMock.token}`,
      );
      expect(payload).toBe(jwtMock.token);
    });
  });
});
