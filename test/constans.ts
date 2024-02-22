import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../src/user/user.module';
import { JWTModule } from '../src/utills/jwt/jwt.module';
import { StringModule } from '../src/utills/data-structure/string/string.module';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from '../src/config/environment.config';
import { LoggerModule } from '../src/common/logger/logger.module';

export const database = process.env.DATABASE;

export const imports = [
  MongooseModule.forRoot(database),
  UserModule,
  JWTModule,
  StringModule,
  LoggerModule,
  ConfigModule.forRoot({
    isGlobal: true,
    load: [environmentConfig],
  }),
];
