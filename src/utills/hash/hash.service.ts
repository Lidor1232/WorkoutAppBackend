import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class HashService {
  constructor(private loggerService: LoggerService) {}

  async compare({
    data,
    encrypted,
  }: {
    data: string;
    encrypted: string;
  }): Promise<boolean> {
    this.loggerService.logger.debug(
      {
        data,
        encrypted,
      },
      'Getting is data match encrypted',
    );
    const isValidData = await bcrypt.compare(data, encrypted);
    this.loggerService.logger.info(
      {
        data,
        encrypted,
        isValidData,
      },
      'Got is data match encrypted',
    );
    return isValidData;
  }
}
