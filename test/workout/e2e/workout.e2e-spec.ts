import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from '../../../src/workout/workout.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { User, UserDocument } from '../../../src/user/user.schema';
import { clearAllCollections } from '../../../src/utills/test/test.util';
import * as request from 'supertest';
import { userMock } from '../../user/mock/user.mock';
import { workoutMock } from '../mock/workout.mock';

describe('workout', function () {
  let app: INestApplication;
  let workoutModel: Model<WorkoutDocument>;
  let userModel: Model<UserDocument>;

  beforeAll(async function () {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    workoutModel = moduleRef.get(getModelToken(Workout.name));
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

  describe('createWorkout', function () {
    beforeEach(async function () {
      await clearAllCollections(userModel);
    });

    it('', async function () {
      // Setup Test
      const createUserRes = await request(app.getHttpServer())
        .post('/user/create')
        .send({
          firstName: userMock.firstName,
          lastName: userMock.lastName,
          userName: userMock.userName,
          password: userMock.password,
        })
        .expect(201);

      // // Test
      const res = await request(app.getHttpServer())
        .post('/workout')
        .send({
          date: workoutMock.date,
          exercises: [
            {
              name: 'Exercise 1',
              sets: [
                {
                  weight: 10,
                  reps: 10,
                },
              ],
            },
          ],
        })
        .set('Authorization', `Bearer ${createUserRes.body.token}`)
        .expect(201);
      expect(res.body.date).toBe(workoutMock.date);
      expect(res.body._id).toBeDefined();
    });
  });
});
