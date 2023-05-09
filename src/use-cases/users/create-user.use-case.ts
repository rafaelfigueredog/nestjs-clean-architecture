import { User } from '@domain/entities';
import { UserRepository } from '@domain/contracts';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.insert(user);
  }
}
