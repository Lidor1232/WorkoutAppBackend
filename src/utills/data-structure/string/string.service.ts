import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  constructor() {}

  stringsEqualOrThrow({
    string1,
    string2,
  }: {
    string1: string;
    string2: string;
  }): void {
    if (string1 !== string2) {
      throw new BadRequestException('Strings not equal');
    }
  }
}
