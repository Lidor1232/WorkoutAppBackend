import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from '../../utills/bcrypt/bcrypt';
import { JWTService } from '../../utills/jwt/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptService, JWTService],
})
export class UserModule {}
