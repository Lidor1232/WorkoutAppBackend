import { Injectable, Logger } from '@nestjs/common';
import { CreateUser } from './user.dto';
import { HashService } from '../common/hash/hash.service';
import { UserDal } from './user.dal';
import { User } from './user.schema';
import {
  InvalidUserPassword,
  UserAlreadyExist,
  UserNotFound,
} from './user.interface';

@Injectable()
export class UserService {
  constructor(private userDal: UserDal, private hashService: HashService) {}
  private readonly logger = new Logger();

  async getById({ userId }: { userId: string }): Promise<User | null> {
    this.logger.debug(
      {
        userId,
      },
      'Getting user by id',
    );
    const user = await this.userDal.getById({ userId });
    this.logger.log(
      {
        userId,
        user,
      },
      'Got user by id',
    );
    return user;
  }

  async getByIdOrThrow({ userId }: { userId: string }): Promise<User> {
    this.logger.debug(
      {
        userId,
      },
      'Getting user by id or throw',
    );
    const user = await this.getById({
      userId,
    });
    if (user === null) {
      throw new UserNotFound();
    }
    this.logger.log(
      {
        userId,
        user,
      },
      'Got user by id or throw',
    );
    return user;
  }

  async create({ createUser }: { createUser: CreateUser }): Promise<User> {
    this.logger.debug(
      {
        createUser,
      },
      'Creating user',
    );
    const createdUser = await this.userDal.create(createUser);
    this.logger.log(
      {
        createUser,
        createdUser,
      },
      'Created user',
    );
    return createdUser;
  }

  async getByUserName({
    userName,
  }: {
    userName: string;
  }): Promise<User | null> {
    this.logger.debug(
      {
        userName,
      },
      'Getting user by user name',
    );
    const user = await this.userDal.getByUserName({
      userName,
    });
    this.logger.log(
      {
        userName,
        user,
      },
      'Got user by user name',
    );
    return user;
  }

  async getByUserNameOrThrow({
    userName,
  }: {
    userName: string;
  }): Promise<User> {
    this.logger.debug(
      {
        userName,
      },
      'Getting user by user name or throw',
    );
    const user = await this.getByUserName({
      userName,
    });
    if (user === null) {
      throw new UserNotFound();
    }
    this.logger.log(
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
    this.logger.debug(
      {
        password,
        userPassword,
      },
      'Validating user password or throw',
    );
    const isValidPassword = await this.hashService.compare({
      data: password,
      encrypted: userPassword,
    });
    if (!isValidPassword) {
      throw new InvalidUserPassword();
    }
    this.logger.log(
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
    this.logger.debug(
      {
        userName,
      },
      'getting user not exist by user name or throw',
    );
    const user = await this.getByUserName({
      userName,
    });
    if (user !== null) {
      throw new UserAlreadyExist();
    }
    this.logger.log(
      {
        userName,
        user,
      },
      'Got user not exist by user name or throw',
    );
  }
}
