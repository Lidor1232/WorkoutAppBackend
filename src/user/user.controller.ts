import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UserLogin } from './user.dto';
import { UserApiResponse } from './responses/user-api-response';
import { JWTService } from '../common/jwt/jwt.service';
import { CreateUserApiResponse } from './responses/create-user-api-response';
import { LoginUserApiResponse } from './responses/login-user-api-response';
import { AuthGuard } from '../common/guard/auth/auth.guard';
import { UserTokenPayload } from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JWTService,
  ) {}

  @Get('/:userId/details')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Request()
    req: {
      user: UserTokenPayload;
    },
  ) {
    const user = await this.userService.findByIdOrThrow({
      userId: req.user._id,
    });
    return new UserApiResponse({
      user,
    });
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: UserLogin) {
    const user = await this.userService.findByUserNameOrThrow({
      userName: body.userName,
    });
    await this.userService.validDocPasswordByPasswordOrThrow({
      userPassword: user.password,
      password: body.password,
    });
    const userToken = this.jwtService.createUserToken({
      user: {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    return new LoginUserApiResponse({ user, token: userToken });
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUser) {
    await this.userService.docNotExistByUserNameOrThrow({
      userName: body.userName,
    });
    const user = await this.userService.create({
      createUser: body,
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
