import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from '../../utills/bcrypt/bcrypt';

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptService],
})
export class UserModule {}
