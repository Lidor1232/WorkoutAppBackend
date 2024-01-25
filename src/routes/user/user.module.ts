import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from '../../utills/bcrypt/bcrypt.module';
import { JWTModule } from '../../utills/jwt/jwt.module';

@Module({
  imports: [BcryptModule, JWTModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
