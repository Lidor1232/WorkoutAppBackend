import { Inject, Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';
import { context } from '../../utills/async-context/async-context';
import { environmentConfig } from '../../config/environment.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class LoggerService {
  logger: Logger;

  constructor(
    @Inject(environmentConfig.KEY)
    private envConfig: ConfigType<typeof environmentConfig>,
  ) {
    this.logger = pino({
      enabled: this.envConfig.enableLogs === 'true',
      mixin() {
        return {
          requestId: context.getStore()?.requestId,
        };
      },
    });
  }
}
