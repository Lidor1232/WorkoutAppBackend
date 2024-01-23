import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { GetUserApiResponse } from './responses/get-user-api-response';
import { UserLogin } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async getUser(@Param() params: { userId: string }, @Res() res: Response) {
    const user = await this.userService.getDocByIdOrThrow({
      userId: params.userId,
    });
    return res.status(HttpStatus.OK).json(
      new GetUserApiResponse({
        user,
      }),
    );
  }

  @Post('/login')
  async loginUser(@Body() body: UserLogin, @Res() res: Response) {
    const user = await this.userService.getUserByUserNameOrThrow({
      userName: body.userName,
    });
    return res.status(HttpStatus.OK).json({
      message: 'Success',
    });
  }
}
