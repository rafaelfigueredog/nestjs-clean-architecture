import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongoAvatarRepository } from './avatar.repository';

import {
  MongoDbModule,
  MongoDbService,
  Avatar as MongoAvatar,
} from '@infrastructure/db/mongo';
import { Avatar } from '@app/domain';

describe('MongoAvatarRepository', () => {
  let avatarRepository: MongoAvatarRepository;
  let dbConnection: Connection;
  let avatarModel: Model<MongoAvatar>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongoDbModule],
      providers: [
        MongoAvatarRepository,
        {
          provide: getModelToken(MongoAvatar.name),
          useValue: Model<MongoAvatar>,
        },
        MongoDbService,
      ],
    }).compile();

    // get database service
    const mongoDbService = moduleRef.get<MongoDbService>(MongoDbService);

    // get db connection
    dbConnection = mongoDbService.getConnection();

    // drop database before start the tests.
    await dbConnection.db.dropDatabase();

    avatarModel = moduleRef.get<Model<MongoAvatar>>(
      getModelToken(MongoAvatar.name)
    );
    avatarRepository = moduleRef.get<MongoAvatarRepository>(
      MongoAvatarRepository
    );
  });

  describe('insert', () => {
    it('should insert a new avatar', async () => {
      const avatar = new Avatar({
        hash: '123',
        userId: 1,
      });

      const newAvatar = await avatarRepository.insert(avatar);

      expect(newAvatar.id).toBeTruthy();
      expect(newAvatar.hash).toEqual(avatar.hash);
      expect(newAvatar.userId).toEqual(avatar.userId);
    });
  });

  describe('findAll', () => {
    it('should return all avatars', async () => {
      const avatars = await avatarRepository.findAll();
      expect(avatars).toBeInstanceOf(Array<Avatar>);
    });
  });

  describe('remove', () => {
    it('should remove an existing avatar', async () => {
      const avatar = new Avatar({
        hash: '123',
        userId: '1',
      });

      const newAvatar = await avatarRepository.insert(avatar);
      const result = await avatarRepository.remove(newAvatar.id);
      expect(result).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should find an existing avatar', async () => {
      const newAvatar = await avatarRepository.insert(
        new Avatar({
          hash: '123',
          userId: '1',
        })
      );
      const foundAvatar = await avatarRepository.findOne(newAvatar.id);

      expect(foundAvatar.id).toEqual(newAvatar.id);
    });

    it('should return null if avatar not found', async () => {
      jest.spyOn(avatarModel, 'findOne').mockResolvedValueOnce(null);
      const foundAvatar = await avatarRepository.findOne('1');
      expect(foundAvatar).toBeNull();
    });
  });
});
