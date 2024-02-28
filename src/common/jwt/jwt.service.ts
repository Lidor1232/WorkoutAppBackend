import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserTokenPayload } from '../../user/user.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import { getJwtConfig } from '../../config/environment.config';

@Injectable()
export class JWTService {
  constructor(
    @Inject(getJwtConfig.KEY)
    private jwtConfig: ConfigType<typeof getJwtConfig>,
  ) {}
  private readonly logger = new Logger();

  createUserToken({ user }: { user: UserTokenPayload }): string {
    this.logger.debug(
      {
        user,
      },
      'Creating user token',
    );
    const userTokenPayload = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(userTokenPayload, this.jwtConfig.secret);
    this.logger.log(
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
      this.logger.debug(
        {
          token,
        },
        'Verifying user token',
      );
      const decoded = jwt.verify(
        token,
        this.jwtConfig.secret,
      ) as UserTokenPayload;
      this.logger.log(
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
    this.logger.debug(
      {
        token,
      },
      'Verifying user token or throw',
    );
    const decodedTokenPayload = this.verifyUserToken({
      token,
    });
    if (decodedTokenPayload === null) {
      throw new UnauthorizedException();
    }
    this.logger.log(
      { token, decodedTokenPayload },
      'Verified user token or throw',
    );
    return decodedTokenPayload;
  }

  extractJwtFromAuthorizationHeader(authorizationHeader?: string) {
    this.logger.debug(
      {
        authorizationHeader,
      },
      'extracting jwt from authorization header',
    );
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is empty');
    }
    if (!authorizationHeader.includes('Bearer')) {
      throw new UnauthorizedException(
        "Authorization header must be of type bearer: 'Bearer {TOKEN}'",
      );
    }
    const token = authorizationHeader.replace('Bearer ', '');
    this.logger.log(
      {
        authorizationHeader,
        token,
      },
      'extracted jwt from authorization header',
    );
    return token;
  }
}
