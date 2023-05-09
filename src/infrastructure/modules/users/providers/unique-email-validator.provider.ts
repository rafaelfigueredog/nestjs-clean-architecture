import { Provider } from '@nestjs/common';
import { UniqueEmailValidator } from '@infrastructure/modules/users';
import { MongoUserRepository } from '@app/infrastructure/db';
import { UserRepository } from '@app/domain/contracts';

export const UniqueEmailValidatorProvider: Provider = {
  provide: UniqueEmailValidator,
  useFactory: (userRepository: UserRepository) => {
    return new UniqueEmailValidator(userRepository);
  },
  inject: [MongoUserRepository],
};
