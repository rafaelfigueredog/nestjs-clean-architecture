import { BlobRepository } from '@domain/contracts';
import { GetBase64ImageUseCase } from '@app/use-cases';
import { Provider } from '@nestjs/common';
import { FileSystemRepository } from '@app/infrastructure/db';

export const GetBase64ImageUseCaseProvider: Provider = {
  provide: GetBase64ImageUseCase,
  useFactory: (blobRepository: BlobRepository) => {
    return new GetBase64ImageUseCase(blobRepository);
  },
  inject: [FileSystemRepository],
};
