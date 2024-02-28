import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HashService {
  constructor() {}
  private readonly logger = new Logger();

  async compare({
    data,
    encrypted,
  }: {
    data: string;
    encrypted: string;
  }): Promise<boolean> {
    this.logger.debug(
      {
        data,
        encrypted,
      },
      'Getting is data match encrypted',
    );
    const isValidData = await bcrypt.compare(data, encrypted);
    this.logger.log(
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
