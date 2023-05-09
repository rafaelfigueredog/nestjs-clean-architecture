import { AvatarRepository, BlobRepository } from '@domain/contracts';
import { Provider } from '@nestjs/common';
import { DeleteAvatarUseCase } from '@app/use-cases';

import {
  FileSystemRepository,
  MongoAvatarRepository,
} from '@infrastructure/db';

export const DeleteAvatarUseCaseProvider: Provider = {
  provide: DeleteAvatarUseCase,
  useFactory: (
    avatarRepository: AvatarRepository,
    blobRepository: BlobRepository
  ) => {
    return new DeleteAvatarUseCase(avatarRepository, blobRepository);
  },
  inject: [MongoAvatarRepository, FileSystemRepository],
};
