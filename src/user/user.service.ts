import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from './user.dto';
import { HashService } from '../common/hash/hash.service';
import { UserDal } from './user.dal';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private userDal: UserDal, private hashService: HashService) {}
  private readonly logger = new Logger();

  async findById({ userId }: { userId: string }): Promise<User | null> {
    this.logger.debug(
      {
        userId,
      },
      'Getting user by id',
    );
    const user = await this.userDal.findById({ userId });
    this.logger.log(
      {
        userId,
        user,
      },
      'Got user by id',
    );
    return user;
  }

  async findByIdOrThrow({ userId }: { userId: string }): Promise<User> {
    this.logger.debug(
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

  async findByUserName({
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
    const user = await this.userDal.findByUserName({
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

  async findByUserNameOrThrow({
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
    const user = await this.findByUserName({
      userName,
    });
    if (user === null) {
      throw new NotFoundException('User not found');
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
      throw new BadRequestException('Invalid user password');
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
    const user = await this.findByUserName({
      userName,
    });
    if (user !== null) {
      throw new BadRequestException('User exist with this user name');
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
