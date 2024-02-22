import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './user.dto';

@Injectable()
export class UserDal {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUser): Promise<User> {
    const createdUser = await this.userModel.create(createUser);
    return createdUser;
  }

  async findById({ userId }: { userId: string }): Promise<User | null> {
    const user = this.userModel.findById(userId);
    return user;
  }

  async findByUserName({
    userName,
  }: {
    userName: string;
  }): Promise<User | null> {
    const user = this.userModel.findOne({
      userName,
    });
    return user;
  }
}
