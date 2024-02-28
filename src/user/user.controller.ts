import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UserLogin } from './user.dto';
import { UserApiResponse } from './responses/user-api-response';
import { JWTService } from '../common/jwt/jwt.service';
import { CreateUserApiResponse } from './responses/create-user-api-response';
import { LoginUserApiResponse } from './responses/login-user-api-response';
import { AuthGuard } from '../common/guard/auth/auth.guard';
import {
  InvalidUserPassword,
  UserAlreadyExist,
  UserNotFound,
  UserTokenPayload,
} from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JWTService,
  ) {}

  @Get('/details')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Request()
    req: {
      user: UserTokenPayload;
    },
  ) {
    try {
      const user = await this.userService.getByIdOrThrow({
        userId: req.user.id,
      });
      return new UserApiResponse({
        user,
      });
    } catch (e) {
      if (e instanceof UserNotFound) {
        throw new NotFoundException(e.message);
      }
    }
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: UserLogin) {
    try {
      const user = await this.userService.getByUserNameOrThrow({
        userName: body.userName,
      });
      await this.userService.validDocPasswordByPasswordOrThrow({
        userPassword: user.password,
        password: body.password,
      });
      const userToken = this.jwtService.createUserToken({
        user: {
          id: user.id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
      return new LoginUserApiResponse({ user, token: userToken });
    } catch (e) {
      if (e instanceof UserNotFound) {
        throw new NotFoundException(e.message);
      }
      if (e instanceof InvalidUserPassword) {
        throw new BadRequestException(e.message);
      }
    }
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUser) {
    try {
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
    } catch (e) {
      if (e instanceof UserAlreadyExist) {
        throw new BadRequestException(e.message);
      }
    }
  }
}
