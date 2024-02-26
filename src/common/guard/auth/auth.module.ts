import { Module } from '@nestjs/common';
import { JWTModule } from '../../jwt/jwt.module';

@Module({
  imports: [JWTModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
