import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MongoUserRepository } from './user.repository';
import { User } from '@domain/entities';

import { MongoDbModule, MongoDbService } from '@infrastructure/db/mongo';

describe('MongoUserRepository', () => {
  let userRepository: MongoUserRepository;
  let dbConnection: Connection;
  let userModel: Model<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongoDbModule],
      providers: [
        MongoUserRepository,
        {
          provide: getModelToken(User.name),
          useValue: Model<User>,
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

    userModel = moduleRef.get<Model<User>>(getModelToken(User.name));
    userRepository = moduleRef.get<MongoUserRepository>(MongoUserRepository);
  });

  describe('insert', () => {
    it('should insert a new user', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      });

      const newUser = await userRepository.insert(user);

      expect(newUser.id).toBeTruthy();
      expect(newUser.email).toEqual(user.email);
      expect(newUser.firstName).toEqual(user.firstName);
      expect(newUser.lastName).toEqual(user.lastName);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await userRepository.findAll();
      expect(users).toBeInstanceOf(Array<User>);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe2@example.com',
      });

      const newUser = await userRepository.insert(user);
      const result = await userRepository.remove(newUser.id);
      expect(result).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should find an existing user', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe3@example.com',
      });

      const newUser = await userRepository.insert(user);
      const foundUser = await userRepository.findOne(newUser.id);

      expect(foundUser.id).toEqual(newUser.id);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      const foundUser = await userRepository.findOne('1');

      expect(userModel.findOne).toBeCalledWith({ where: { id: '1' } });
      expect(foundUser).toBeNull();
    });
  });

  describe('existsByEmail', () => {
    it('should return true if user exists with given email', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe4@example.com',
      });

      await userRepository.insert(user);
      const result = await userRepository.existsByEmail(user.email);
      expect(result).toBeTruthy();
    });

    it('should return false if no user exists with given email', async () => {
      const result = await userRepository.existsByEmail('janedoe@example.com');
      expect(result).toBeFalsy();
    });
  });
});
