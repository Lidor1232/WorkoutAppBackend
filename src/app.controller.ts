import { Controller, Get, Res, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(['/', '/health'])
  getHealth(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'Healthy',
      statusCode: 200,
    });
  }
}
