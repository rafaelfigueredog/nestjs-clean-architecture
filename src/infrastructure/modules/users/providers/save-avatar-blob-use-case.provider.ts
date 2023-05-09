import { AvatarRepository, BlobRepository } from '@domain/contracts';
import { Provider } from '@nestjs/common';
import { SaveAvatarUseCase } from '@app/use-cases';

import {
  FileSystemRepository,
  MongoAvatarRepository,
} from '@infrastructure/db';

export const SaveAvatarUseCaseProvider: Provider = {
  provide: SaveAvatarUseCase,
  useFactory: (
    avatarRepository: AvatarRepository,
    blobRepository: BlobRepository
  ) => {
    return new SaveAvatarUseCase(avatarRepository, blobRepository);
  },
  inject: [MongoAvatarRepository, FileSystemRepository],
};
