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
import { CreateUser, UserLogin } from './user.dto';
import { UserApiResponse } from './responses/user-api-response';
import { JWTService } from '../../utills/jwt/jwt';
import { CreateUserApiResponse } from './responses/create-user-api-response';
import { LoginUserApiResponse } from './responses/login-user-api-response';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JWTService,
  ) {}

  @Get('/:userId')
  async getUser(@Param() params: { userId: string }, @Res() res: Response) {
    const user = await this.userService.getDocByIdOrThrow({
      userId: params.userId,
    });
    return res.status(HttpStatus.OK).json(
      new UserApiResponse({
        user,
      }),
    );
  }

  @Post('/login')
  async loginUser(@Body() body: UserLogin, @Res() res: Response) {
    const user = await this.userService.getDocByUserNameOrThrow({
      userName: body.userName,
    });
    await this.userService.validDocPasswordByPasswordOrThrow({
      hash: user.password,
      password: body.password,
    });
    const userToken = this.jwtService.createUserToken({
      user,
    });
    return res
      .status(HttpStatus.OK)
      .json(new LoginUserApiResponse({ user, token: userToken }));
  }

  @Post('/create')
  async createUser(@Body() body: CreateUser, @Res() res: Response) {
    await this.userService.docNotExistByUserNameOrThrow({
      userName: body.userName,
    });
    const user = await this.userService.createDoc({
      user: body,
    });
    const userToken = this.jwtService.createUserToken({
      user,
    });
    return res.status(HttpStatus.CREATED).json(
      new CreateUserApiResponse({
        user,
        token: userToken,
      }),
    );
  }
}
