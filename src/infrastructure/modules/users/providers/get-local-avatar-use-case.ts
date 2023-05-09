import { AvatarRepository } from '@domain/contracts';
import { Provider } from '@nestjs/common';
import { GetLocalAvatarUseCase } from '@app/use-cases';
import { MongoAvatarRepository } from '@infrastructure/db';

export const GetLocalAvatarUseCaseProvider: Provider = {
  provide: GetLocalAvatarUseCase,
  useFactory: (avatarRepository: AvatarRepository) => {
    return new GetLocalAvatarUseCase(avatarRepository);
  },
  inject: [MongoAvatarRepository],
};
