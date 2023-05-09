import { Inject } from '@nestjs/common';

import {
  GetApiAvatarUseCase,
  GetBase64ImageUseCase,
  GetLocalAvatarUseCase,
  SaveAvatarUseCase,
} from '@app/use-cases';

export class GetAvatarUseCase {
  constructor(
    @Inject(GetApiAvatarUseCase)
    private getApiAvatarUseCase: GetApiAvatarUseCase,
    @Inject(SaveAvatarUseCase)
    private saveAvatarUseCase: SaveAvatarUseCase,
    @Inject(GetLocalAvatarUseCase)
    private getLocalAvatarUseCase: GetLocalAvatarUseCase,
    @Inject(GetBase64ImageUseCase)
    private getBase64ImageUseCase: GetBase64ImageUseCase
  ) {}

  async execute(userId: number) {
    let avatar = await this.getLocalAvatarUseCase.execute(userId);
    if (avatar) return this.getBase64ImageUseCase.execute(avatar.hash);

    const avatarBlob = await this.getApiAvatarUseCase.execute(userId);
    avatar = await this.saveAvatarUseCase.execute(userId, avatarBlob);

    return this.getBase64ImageUseCase.execute(avatar.hash);
  }
}
