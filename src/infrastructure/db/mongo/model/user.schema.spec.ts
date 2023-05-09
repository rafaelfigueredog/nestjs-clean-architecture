import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from './user.schema';
import { Connection, Model } from 'mongoose';
import { MongoDbModule } from '../mongo.module';
import { MongoDbService } from '../services';

describe('UserSchema', () => {
  let userModel: Model<User>;
  let dbConnection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: Model<User>,
        },
        MongoDbService,
      ],
    }).compile();

    // get database service
    const mongoDbService = module.get<MongoDbService>(MongoDbService);

    // get db connection
    dbConnection = mongoDbService.getConnection();

    // drop database before start the tests.
    await dbConnection.db.dropCollection('users');

    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('UserSchema Definition', () => {
    it('should be defined', () => {
      expect(UserSchema).toBeDefined();
    });
  });

  describe('User Model', () => {
    it('should be able to create a user', async () => {
      const user = await userModel.create({
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'avatar.png',
      });

      const found = await userModel.findOne({ email: 'test@test.com' }).exec();
      expect(found.email).toEqual(user.email);
    });

    it('should not be able to create a user with a duplicated email', async () => {
      try {
        await userModel.create({
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'Doe',
          avatar: 'avatar.png',
        });
        await userModel.create({
          email: 'test@test.com',
          firstName: 'Jane',
          lastName: 'Doe',
          avatar: 'avatar.png',
        });
      } catch (error) {
        expect(error.code).toBe(11000);
      }
    });

    it('should be able to list users', async () => {
      await userModel.create({
        email: 'johnsmith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        avatar: 'avatar.png',
      });

      const users = await userModel.find().exec();
      expect(users).toBeInstanceOf(Array);
    });

    it('should be able to remove users', async () => {
      const user = await userModel.create({
        email: 'johnsmith2@example.com',
        firstName: 'John',
        lastName: 'Smith',
        avatar: 'avatar.png',
      });

      const response = await userModel.deleteOne({ where: { id: user.id } });
      expect(response.acknowledged).toBeTruthy();
      expect(response.deletedCount).toEqual(1);
    });
  });
});
