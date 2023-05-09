import { UserRepository } from '@app/domain/contracts';
import { MongoUserRepository } from '@app/infrastructure/db';
import { CreateUserUseCase } from '@app/use-cases';
import { Provider } from '@nestjs/common';

export const CreateUserUseCaseProvider: Provider = {
  provide: CreateUserUseCase,
  useFactory: (userRepository: UserRepository) => {
    return new CreateUserUseCase(userRepository);
  },
  inject: [MongoUserRepository],
};
