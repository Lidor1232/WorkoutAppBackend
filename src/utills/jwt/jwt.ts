import { Injectable } from '@nestjs/common';
import { UserTokenPayload } from '../../routes/user/user.interface';
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
}
