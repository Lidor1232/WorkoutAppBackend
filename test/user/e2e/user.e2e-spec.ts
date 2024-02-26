import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../src/user/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import { clearAllCollections } from '../../../src/utills/test/test.util';
import { userMock } from '../mock/user.mock';
import * as request from 'supertest';

describe('user', function () {
  let app: INestApplication;
  let userModel: Model<UserDocument>;

  beforeAll(async function () {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userModel = moduleRef.get(getModelToken(User.name));

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
  });

  describe('getUser', function () {
    beforeEach(async function () {
      await clearAllCollections(userModel);
    });

    it('', async function () {
      // Setup test
      const res = await request(app.getHttpServer())
        .post('/user/create')
        .send({
          firstName: userMock.firstName,
          lastName: userMock.lastName,
          userName: userMock.userName,
          password: userMock.password,
        })
        .expect(201);

      // Test
      await request(app.getHttpServer())
        .get(`/user/${res.body.user._id}/details`)
        .set('Authorization', `Bearer ${res.body.token}`)
        .expect(200)
        .expect({
          _id: res.body.user._id,
          firstName: userMock.firstName,
          lastName: userMock.lastName,
          userName: userMock.userName,
        });
    });
  });

  describe('loginUser', function () {
    beforeEach(async function () {
      await clearAllCollections(userModel);
    });

    it('', async function () {
      // Setup test
      const createdUser = await userModel.create(userMock);

      // Test
      const res = await request(app.getHttpServer())
        .post(`/user/login`)
        .send({
          userName: userMock.userName,
          password: userMock.password,
        })
        .expect(200);

      expect(res.body.user).toMatchObject({
        _id: createdUser._id.toString(),
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        userName: userMock.userName,
      });
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('createUser', function () {
    beforeEach(async function () {
      await clearAllCollections(userModel);
    });

    it('', async function () {
      // Test
      const res = await request(app.getHttpServer())
        .post('/user/create')
        .send({
          firstName: userMock.firstName,
          lastName: userMock.lastName,
          userName: userMock.userName,
          password: userMock.password,
        })
        .expect(201);

      expect(res.body.user).toMatchObject({
        _id: res.body.user._id,
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        userName: userMock.userName,
      });
      expect(res.body).toHaveProperty('token');
    });
  });
});
