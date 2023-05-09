import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { MongoDbModule } from '../mongo.module';
import { MongoDbService } from '../services';
import { Avatar, AvatarSchema } from './avatar.schema';

describe('UserSchema', () => {
  let avatarModel: Model<Avatar>;
  let dbConnection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule],
      providers: [
        {
          provide: getModelToken(Avatar.name),
          useValue: Model<Avatar>,
        },
        MongoDbService,
      ],
    }).compile();

    const mongoDbService = module.get<MongoDbService>(MongoDbService);
    dbConnection = mongoDbService.getConnection();
    await dbConnection.db.dropCollection('avatars');
    avatarModel = module.get<Model<Avatar>>(getModelToken(Avatar.name));
  });

  describe('AvatarSchema Definition', () => {
    it('should be defined', () => {
      expect(AvatarSchema).toBeDefined();
    });
  });

  describe('Avatar Model', () => {
    it('should be able to create a avatar', async () => {
      const avatar = await avatarModel.create({
        hash: '123',
        userId: 1,
      });

      const found = await avatarModel.findOne({ hash: '123' }).exec();
      expect(found.userId).toEqual(avatar.userId);
      expect(found.hash).toEqual(avatar.hash);
    });

    it('should not be able to create a avatar with a duplicated hash', async () => {
      try {
        await avatarModel.create({
          hash: '123',
          userId: 1,
        });
        await avatarModel.create({
          hash: '123',
          userId: 2,
        });
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    it('should not be able to create a avatar with a duplicated userId', async () => {
      try {
        await avatarModel.create({
          hash: '321',
          userId: 2,
        });
        await avatarModel.create({
          hash: '123',
          userId: 2,
        });
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    it('should be able to list avatars', async () => {
      await avatarModel.create({
        hash: '321',
        userId: 2,
      });

      const avatars = await avatarModel.find().exec();
      expect(avatars).toBeInstanceOf(Array);
      expect(avatars.at(0)).toBeInstanceOf(Model<Avatar>);
    });

    it('should be able to remove an avatar', async () => {
      const avatar = await avatarModel.create({
        hash: 'abc',
        userId: 1,
      });

      const response = await avatarModel.deleteOne({
        where: { id: avatar.id },
      });

      expect(response.acknowledged).toBeTruthy();
      expect(response.deletedCount).toEqual(1);
    });
  });
});
