import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUser } from './user.dto';

@Injectable()
export class UserDal {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUser): Promise<User> {
    return this.userModel.create(createUser);
  }

  async getById({ userId }: { userId: string }): Promise<User | null> {
    return this.userModel.findById(userId);
  }

  async getByUserName({
    userName,
  }: {
    userName: string;
  }): Promise<User | null> {
    return this.userModel.findOne({
      userName,
    });
  }
}
