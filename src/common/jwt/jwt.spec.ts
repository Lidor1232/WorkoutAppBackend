import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from '../../config/environment.config';
import { JWTService } from './jwt.service';
import { UnauthorizedException } from '@nestjs/common';

describe('JWTService', function () {
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [environmentConfig],
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
          userName: 'lidor123',
          _id: '123',
          firstName: '123',
          lastName: '123',
        },
      });
      expect(typeof payload).toBe('string');
    });
  });

  describe('verifyUserToken', function () {
    it('', async function () {
      const payload = jwtService.verifyUserToken({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
      });
      const result = {
        _id: '65d47ebc5fb3e90904e083fc',
        userName: 'lidor123',
        firstName: 'lidor',
        lastName: 'dvir',
        iat: 1708508177,
      };
      expect(payload).toMatchObject(result);
    });

    it('', async function () {
      const payload = jwtService.verifyUserToken({
        token:
          'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
      });
      expect(payload).toBe(null);
    });
  });

  describe('verifyUserTokenOrThrow', function () {
    it('', async function () {
      const payload = jwtService.verifyUserTokenOrThrow({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
      });
      const result = {
        _id: '65d47ebc5fb3e90904e083fc',
        userName: 'lidor123',
        firstName: 'lidor',
        lastName: 'dvir',
        iat: 1708508177,
      };
      expect(payload).toMatchObject(result);
    });

    it('', function () {
      expect(function () {
        jwtService.verifyUserTokenOrThrow({
          token:
            'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
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
        jwtService.extractJwtFromAuthorizationHeader(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
        );
      }).toThrow(UnauthorizedException);
    });

    it('', async function () {
      const payload = jwtService.extractJwtFromAuthorizationHeader(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
      );
      expect(payload).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2ViYzVmYjNlOTA5MDRlMDgzZmMiLCJ1c2VyTmFtZSI6ImxpZG9yMTIzIiwiZmlyc3ROYW1lIjoibGlkb3IiLCJsYXN0TmFtZSI6ImR2aXIiLCJpYXQiOjE3MDg1MDgxNzd9.9g41VLQ8F_JIcR_LtL18_AEpGWeowmZhfGMjwTWI_Qc',
      );
    });
  });
});
