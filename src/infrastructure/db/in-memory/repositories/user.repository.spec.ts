import { CryptoIDGeneratorService } from '@app/infrastructure/common';
import { InMemoryUserRepository } from './user.repository';
import { UniqueIDGenerator } from '@domain/contracts';
import { User } from '@domain/entities';

import * as crypto from 'crypto';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;
  let uniqueIDGenerator: UniqueIDGenerator;

  beforeEach(() => {
    uniqueIDGenerator = new CryptoIDGeneratorService(crypto);
    repository = new InMemoryUserRepository(uniqueIDGenerator);
  });

  it('should insert a user', async () => {
    const user = new User({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    const insertedUser = await repository.insert(user);
    expect(insertedUser).toHaveProperty('id');
    expect(insertedUser.id).toBeTruthy();
    expect(insertedUser.firstName).toEqual(user.firstName);
    expect(insertedUser.lastName).toEqual(user.lastName);
    expect(insertedUser.email).toEqual(user.email);
  });

  it('should find a user', async () => {
    const user = new User({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    const { id: uuid } = await repository.insert(user);
    const foundUser = await repository.findOne(uuid);
    expect(foundUser).toEqual(user);
  });

  it('should remove a user', async () => {
    const entity = new User({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });
    const newUser = await repository.insert(entity);
    const result = await repository.remove(newUser.id);

    expect(result).toEqual(true);
    expect(await repository.findOne(newUser.id)).toEqual(undefined);
  });

  it('should not remove a non-existent user', async () => {
    const result = await repository.remove('123');

    expect(result).toEqual(false);
  });

  it('should find all users', async () => {
    const user1 = new User({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    const user2 = new User({
      email: 'janesmith@example.com',
      firstName: 'Jane',
      lastName: ' Smith',
    });

    await repository.insert(user1);
    await repository.insert(user2);

    const result = await repository.findAll();
    expect(result).toEqual(expect.arrayContaining([user1, user2]));
  });

  it('All users should have unique id', async () => {
    const user1 = new User({
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    const user2 = new User({
      email: 'janesmith@example.com',
      firstName: 'Jane',
      lastName: ' Smith',
    });

    await repository.insert(user1);
    await repository.insert(user2);

    const result = await repository.findAll();
    const ids = new Set<string>();

    result.forEach((user) => {
      expect(ids.has(user.id)).toBe(false);
      ids.add(user.id);
    });
  });

  it('should not find a user by ID if it does not exist', async () => {
    const result = await repository.findOne('invalid-id');
    expect(result).toBeUndefined();
  });

  it('should return false when trying to remove a non-existent user', async () => {
    const result = await repository.remove('invalid-id');
    expect(result).toBe(false);
  });

  it('should check if a user exists by email', async () => {
    const user = new User({
      email: 'janesmith@example.com',
      firstName: 'Jane',
      lastName: ' Smith',
    });

    await repository.insert(user);

    const result = await repository.existsByEmail(user.email);
    expect(result).toBe(true);
  });
});
