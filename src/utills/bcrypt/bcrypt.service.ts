import * as bcrypt from 'bcrypt';
import logger from '../../config/logger';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  async isPasswordMatchHash({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    logger.debug(
      {
        password,
        hash,
      },
      'Getting is password match hash',
    );
    const isValidPassword = await bcrypt.compare(password, hash);
    logger.info(
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
