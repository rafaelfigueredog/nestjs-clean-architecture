import { Avatar } from '@domain/entities';
import { AvatarDocument } from '@infrastructure/db/mongo';
import { AvatarRepository } from '@domain/contracts';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MongoAvatarRepository implements AvatarRepository {
  constructor(
    @InjectModel(Avatar.name)
    private readonly avatarModel: Model<AvatarDocument>
  ) {}

  async findOneByUserId(userId: number): Promise<Avatar | null> {
    const avatar = await this.avatarModel.findOne({ userId });
    return avatar ? new Avatar({ id: avatar.id, ...avatar.toObject() }) : null;
  }

  async insert(entity: Avatar): Promise<Avatar> {
    const avatar = await this.avatarModel.create(entity);
    return new Avatar({ id: avatar.id, ...avatar.toObject() });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.avatarModel.deleteOne({ id });
    return result.acknowledged;
  }

  async findOne(id: string): Promise<Avatar> {
    const avatar = await this.avatarModel.findById(id);
    return avatar ? new Avatar({ id: avatar.id, ...avatar.toObject() }) : null;
  }

  async findAll(): Promise<Avatar[]> {
    const avatarArr = await this.avatarModel.find();
    return avatarArr.map(
      (avt) => new Avatar({ id: avt.id, ...avt.toObject() })
    );
  }
}
