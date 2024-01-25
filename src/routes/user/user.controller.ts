import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UserLogin } from './user.dto';
import { UserApiResponse } from './responses/user-api-response';
import { JWTService } from '../../utills/jwt/jwt.service';
import { CreateUserApiResponse } from './responses/create-user-api-response';
import { LoginUserApiResponse } from './responses/login-user-api-response';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../../decorators/user.decorator';
import { UserTokenPayload } from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JWTService,
  ) {}

  @Get('/:userId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Param() params: { userId: string },
    @User() reqUser: UserTokenPayload,
  ) {
    const user = await this.userService.getDocByIdOrThrow({
      userId: reqUser._id,
    });
    return new UserApiResponse({
      user,
    });
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: UserLogin) {
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
    return new LoginUserApiResponse({ user, token: userToken });
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUser) {
    await this.userService.docNotExistByUserNameOrThrow({
      userName: body.userName,
    });
    const user = await this.userService.createDoc({
      user: body,
    });
    const userToken = this.jwtService.createUserToken({
      user,
    });
    return new CreateUserApiResponse({
      user,
      token: userToken,
    });
  }
}
