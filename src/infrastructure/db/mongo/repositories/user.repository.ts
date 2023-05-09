import { User } from '@domain/entities';
import { UserDocument } from '@infrastructure/db/mongo';
import { UserRepository } from '@domain/contracts';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async insert(entity: User): Promise<User> {
    const user = await this.userModel.create(entity);
    return new User({ id: user.id, ...user.toObject() });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ id });
    return result.acknowledged;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return user ? new User({ id: user.id, ...user.toObject() }) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users.map((user) => new User({ id: user.id, ...user.toObject() }));
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return Boolean(user);
  }
}
