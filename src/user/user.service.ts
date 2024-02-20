import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import logger from '../common/logger/logger';
import { CreateUser } from './user.dto';
import { BcryptService } from '../utills/bcrypt/bcrypt.service';
import { UserDal } from './user.dal';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private userDal: UserDal, private bcryptService: BcryptService) {}

  async findById({ userId }: { userId: string }): Promise<User | null> {
    logger.debug(
      {
        userId,
      },
      'Getting user by id',
    );
    const user = await this.userDal.findById({ userId });
    logger.info(
      {
        userId,
        user,
      },
      'Got user by id',
    );
    return user;
  }

  async findByIdOrThrow({ userId }: { userId: string }): Promise<User> {
    logger.debug(
      {
        userId,
      },
      'Getting user by id or throw',
    );
    const user = await this.findById({
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

  async create({ createUser }: { createUser: CreateUser }): Promise<User> {
    logger.debug(
      {
        createUser: createUser,
      },
      'Creating user',
    );
    const createdUser = await this.userDal.create(createUser);
    logger.info(
      {
        createUser,
        createdUser,
      },
      'Created user',
    );
    return createdUser;
  }

  async findByUserName({
    userName,
  }: {
    userName: string;
  }): Promise<User | null> {
    logger.debug(
      {
        userName,
      },
      'Getting user by user name',
    );
    const user = await this.userDal.findByUserName({
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

  async findByUserNameOrThrow({
    userName,
  }: {
    userName: string;
  }): Promise<User> {
    logger.debug(
      {
        userName,
      },
      'Getting user by user name or throw',
    );
    const user = await this.findByUserName({
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

  async validDocPasswordByPasswordOrThrow({
    password,
    userPassword,
  }: {
    password: string;
    userPassword: string;
  }): Promise<void> {
    logger.debug(
      {
        password,
        userPassword,
      },
      'Validating user password or throw',
    );
    const isValidPassword = await this.bcryptService.isPasswordMatchHash({
      password,
      hash: userPassword,
    });
    if (!isValidPassword) {
      throw new BadRequestException('Invalid user password');
    }
    logger.info(
      {
        password,
        userPassword,
        isValidPassword,
      },
      'Validated user password or throw',
    );
  }

  async docNotExistByUserNameOrThrow({
    userName,
  }: {
    userName: string;
  }): Promise<void> {
    logger.debug(
      {
        userName,
      },
      'getting user not exist by user name or throw',
    );
    const user = await this.findByUserName({
      userName,
    });
    if (user !== null) {
      throw new BadRequestException('User exist with this user name');
    }
    logger.info(
      {
        userName,
        user,
      },
      'Got user not exist by user name or throw',
    );
  }
}
