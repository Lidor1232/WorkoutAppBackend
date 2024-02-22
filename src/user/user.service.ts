import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from './user.dto';
import { BcryptService } from '../utills/bcrypt/bcrypt.service';
import { UserDal } from './user.dal';
import { User } from './user.schema';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private userDal: UserDal,
    private bcryptService: BcryptService,
    private loggerService: LoggerService,
  ) {}

  async findById({ userId }: { userId: string }): Promise<User | null> {
    this.loggerService.logger.debug(
      {
        userId,
      },
      'Getting user by id',
    );
    const user = await this.userDal.findById({ userId });
    this.loggerService.logger.info(
      {
        userId,
        user,
      },
      'Got user by id',
    );
    return user;
  }

  async findByIdOrThrow({ userId }: { userId: string }): Promise<User> {
    this.loggerService.logger.debug(
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
    this.loggerService.logger.info(
      {
        userId,
        user,
      },
      'Got user by id or throw',
    );
    return user;
  }

  async create({ createUser }: { createUser: CreateUser }): Promise<User> {
    this.loggerService.logger.debug(
      {
        createUser: createUser,
      },
      'Creating user',
    );
    const createdUser = await this.userDal.create(createUser);
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
      {
        userName,
      },
      'Getting user by user name',
    );
    const user = await this.userDal.findByUserName({
      userName,
    });
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
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
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
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
    this.loggerService.logger.info(
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
    this.loggerService.logger.debug(
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
    this.loggerService.logger.info(
      {
        userName,
        user,
      },
      'Got user not exist by user name or throw',
    );
  }
}
