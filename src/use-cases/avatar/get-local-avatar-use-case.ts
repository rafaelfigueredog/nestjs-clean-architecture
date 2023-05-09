import { AvatarRepository } from '@app/domain/contracts';

export class GetLocalAvatarUseCase {
  constructor(private avatarRepository: AvatarRepository) {}

  async execute(userId: number) {
    return this.avatarRepository.findOneByUserId(userId);
  }
}
