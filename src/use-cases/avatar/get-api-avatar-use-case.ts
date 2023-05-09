import { AvatarApi } from '@app/domain/contracts';

export class GetApiAvatarUseCase {
  constructor(private avatarApi: AvatarApi) {}

  async execute(userId: number): Promise<ArrayBuffer> {
    return this.avatarApi.getAvatarByUserId(userId);
  }
}
