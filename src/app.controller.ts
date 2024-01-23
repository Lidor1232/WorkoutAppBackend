import { Controller, Get, Res, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get(['/', '/health'])
  getHealth(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'Healthy',
      statusCode: 200,
    });
  }
}
