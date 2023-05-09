import { AvatarRepository } from '@domain/contracts';
import { BlobRepository } from '@domain/contracts';

export class SaveAvatarUseCase {
  constructor(
    private avatarRepository: AvatarRepository,
    private blobRepository: BlobRepository
  ) {}

  async execute(userId: number, blob: ArrayBuffer) {
    const hash = await this.blobRepository.create(blob);
    return this.avatarRepository.insert({ hash, userId });
  }
}
