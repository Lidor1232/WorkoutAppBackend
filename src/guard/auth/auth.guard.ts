import { CanActivate, Injectable } from '@nestjs/common';
import { JWTService } from '../../utills/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}

  async canActivate(context): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.jwtService.extractJwtFromAuthorizationHeader(
      request.headers.authorization,
    );
    const tokenPayload = this.jwtService.verifyUserTokenOrThrow({
      token,
    });
    request['user'] = tokenPayload;
    return true;
  }
}
