import { Module } from '@nestjs/common';
import { JWTModule } from '../../utills/jwt/jwt.module';

@Module({
  imports: [JWTModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
