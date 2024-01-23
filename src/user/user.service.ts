import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserModel from './user.model';
import logger from '../config/logger';
import { CreateUser } from './user.dto';
import * as BcryptService from '../utills/bcrypt/bcrypt';

@Injectable()
export class UserService {
  async getDocById({ userId }: { userId: string }) {
    logger.debug(
      {
        userId,
      },
      'Getting user by id',
    );
    const user = await UserModel.findById(userId);
    logger.info(
      {
        userId,
        user,
      },
      'Got user by id',
    );
    return user;
  }

  async getDocByIdOrThrow({ userId }: { userId: string }) {
    logger.debug(
      {
        userId,
      },
      'Getting user by id or throw',
    );
    const user = this.getDocById({
      userId,
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    logger.info(
      {
        userId,
        user,
      },
      'Got user by id or throw',
    );
    return user;
  }

  async createUser({ user }: { user: CreateUser }) {
    logger.debug(
      {
        user,
      },
      'Creating user',
    );
    const createdUser = await UserModel.create(user);
    logger.info(
      {
        user,
        createdUser,
      },
      'Created user',
    );
    return createdUser;
  }

  async getUserByUserName({ userName }: { userName: string }) {
    logger.debug(
      {
        userName,
      },
      'Getting user by user name',
    );
    const user = await UserModel.findOne({
      userName,
    });
    logger.info(
      {
        userName,
        user,
      },
      'Got user by user name',
    );
    return user;
  }

  async getUserByUserNameOrThrow({ userName }: { userName: string }) {
    logger.debug(
      {
        userName,
      },
      'Getting user by user name or throw',
    );
    const user = await this.getUserByUserName({
      userName,
    });
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    logger.info(
      {
        userName,
        user,
      },
      'Got user by user name or throw',
    );
    return user;
  }

  async validUserPasswordOrThrow({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<void> {
    logger.debug(
      {
        password,
        hash,
      },
      'Validating user password or throw',
    );
    const isValidPassword = await BcryptService.isPasswordMatchHash({
      password,
      hash,
    });
    if (!isValidPassword) {
      throw new BadRequestException('Invalid user password');
    }
    logger.info(
      {
        password,
        hash,
        isValidPassword,
      },
      'Validated user password or throw',
    );
  }
}
