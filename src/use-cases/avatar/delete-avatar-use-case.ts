import { AvatarRepository } from '@domain/contracts';
import { BlobRepository } from '@domain/contracts';

export class DeleteAvatarUseCase {
  constructor(
    private avatarRepository: AvatarRepository,
    private blobRepository: BlobRepository
  ) {}

  async execute(userId: number): Promise<void> {
    const avatar = await this.avatarRepository.findOneByUserId(userId);
    if (!avatar) return;

    await this.avatarRepository.remove(avatar.id);
    await this.blobRepository.remove(avatar.hash);
  }
}
