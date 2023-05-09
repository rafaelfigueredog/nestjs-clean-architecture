import { User } from '@domain/entities';
import { UniqueIDGenerator, UserRepository } from '@domain/contracts';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  constructor(private readonly uniqueIDGenerator: UniqueIDGenerator) {}

  async insert(entity: User): Promise<User> {
    entity.id = this.uniqueIDGenerator.generateUUID();
    this.users.push(entity);
    return entity;
  }

  async remove(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.users.some((user) => user.email === email);
  }
}
