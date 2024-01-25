import { forwardRef, Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { UserModule } from '../user/user.module';
import { JWTModule } from '../../utills/jwt/jwt.module';

@Module({
  imports: [forwardRef(() => UserModule), JWTModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
