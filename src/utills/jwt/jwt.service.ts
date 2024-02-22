import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserTokenPayload } from '../../user/user.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import { environmentConfig } from '../../config/environment.config';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class JWTService {
  constructor(
    @Inject(environmentConfig.KEY)
    private envConfig: ConfigType<typeof environmentConfig>,
    private loggerService: LoggerService,
  ) {}

  createUserToken({ user }: { user: UserTokenPayload }): string {
    this.loggerService.logger.debug(
      {
        user,
      },
      'Creating user token',
    );
    const userTokenPayload = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(userTokenPayload, this.envConfig.jwtSecret);
    this.loggerService.logger.info(
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
      this.loggerService.logger.debug(
        {
          token,
        },
        'Verifying user token',
      );
      const decoded = jwt.verify(
        token,
        this.envConfig.jwtSecret,
      ) as UserTokenPayload;
      this.loggerService.logger.debug(
        {
          token,
          decoded,
        },
        'Verified user token',
      );
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
