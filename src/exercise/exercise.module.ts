import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { JWTModule } from '../common/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';
import { ExerciseDal } from './exercise.dal';

@Module({
  imports: [
    JWTModule,
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchema,
      },
    ]),
  ],
  providers: [ExerciseService, ExerciseDal],
  controllers: [ExerciseController],
  exports: [ExerciseService, ExerciseDal],
})
export class ExerciseModule {}
