import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptModule } from '../utills/bcrypt/bcrypt.module';
import { JWTModule } from '../utills/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserDal } from './user.dal';
import { StringModule } from '../utills/data-structure/string/string.module';

@Module({
  imports: [
    BcryptModule,
    JWTModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    StringModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserDal],
})
export class UserModule {}
