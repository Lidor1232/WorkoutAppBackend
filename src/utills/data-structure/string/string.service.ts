import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggerService } from '../../../common/logger/logger.service';

@Injectable()
export class StringService {
  constructor(private loggerService: LoggerService) {}

  stringsEqualOrThrow({
    string1,
    string2,
  }: {
    string1: string;
    string2: string;
  }): void {
    this.loggerService.logger.debug(
      {
        string1,
        string2,
      },
      'Validating strings equal or throw',
    );
    if (string1 !== string2) {
      throw new BadRequestException('Strings not equal');
    }
    this.loggerService.logger.debug(
      {
        string1,
        string2,
      },
      'Validated strings equal or throw',
    );
  }
}
