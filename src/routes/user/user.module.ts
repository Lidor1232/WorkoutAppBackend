import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from '../../utills/bcrypt/bcrypt.module';
import { JWTModule } from '../../utills/jwt/jwt.module';
import { WorkoutModule } from '../workout/workout.module';

@Module({
  imports: [BcryptModule, JWTModule, forwardRef(() => WorkoutModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
