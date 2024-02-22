import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class BcryptService {
  constructor(private loggerService: LoggerService) {}

  async isPasswordMatchHash({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    this.loggerService.logger.debug(
      {
        password,
        hash,
      },
      'Getting is password match hash',
    );
    const isValidPassword = await bcrypt.compare(password, hash);
    this.loggerService.logger.info(
      {
        password,
        hash,
        isValidPassword,
      },
      'Got is password match hash',
    );
    return isValidPassword;
  }
}
