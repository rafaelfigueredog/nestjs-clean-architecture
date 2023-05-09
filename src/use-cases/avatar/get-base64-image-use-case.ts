import { BlobRepository } from '@domain/contracts';

export class GetBase64ImageUseCase {
  constructor(private blobRepository: BlobRepository) {}

  async execute(hash: string) {
    return this.blobRepository.findOne(hash);
  }
}
