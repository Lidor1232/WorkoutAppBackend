import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserTokenPayload } from '../../user/user.interface';
import * as jwt from 'jsonwebtoken';
import environmentConfig from '../../config/environment.config';
import logger from '../../config/logger';

@Injectable()
export class JWTService {
  createUserToken({ user }: { user: UserTokenPayload }): string {
    logger.debug(
      {
        user,
      },
      'Creating user token',
    );
    const userTokenPayload = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(userTokenPayload, environmentConfig.jwtSecret);
    logger.info(
      {
        user,
        token,
      },
      'Created user token',
    );
    return token;
  }

  verifyUserToken({ token }: { token: string }): UserTokenPayload | null {
    try {
      const decoded = jwt.verify(
        token,
        environmentConfig.jwtSecret,
      ) as UserTokenPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  verifyUserTokenOrThrow({ token }: { token: string }): UserTokenPayload {
    const decodedTokenPayload = this.verifyUserToken({
      token,
    });
    if (decodedTokenPayload === null) {
      throw new UnauthorizedException();
    }
    return decodedTokenPayload;
  }

  extractJwtFromAuthorizationHeader(authorizationHeader?: string) {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is empty');
    }
    if (!authorizationHeader.includes('Bearer')) {
      throw new UnauthorizedException(
        "Authorization header must be of type bearer: 'Bearer {TOKEN}'",
      );
    }
    const token = authorizationHeader.replace('Bearer ', '');
    return token;
  }
}
