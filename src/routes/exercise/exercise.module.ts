import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { JWTModule } from '../../utills/jwt/jwt.module';

@Module({
  imports: [JWTModule],
  providers: [ExerciseService],
  controllers: [ExerciseController],
  exports: [ExerciseService],
})
export class ExerciseModule {}
