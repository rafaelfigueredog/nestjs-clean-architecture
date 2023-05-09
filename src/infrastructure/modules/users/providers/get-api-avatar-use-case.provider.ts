import { Provider } from '@nestjs/common';
import { GetApiAvatarUseCase } from '@app/use-cases';
import { AvatarApi } from '@domain/contracts';
import { AvatarApiService } from '@infrastructure/api';

export const GetApiAvatarUseCaseProvider: Provider = {
  provide: GetApiAvatarUseCase,
  useFactory: (avatarApi: AvatarApi) => {
    return new GetApiAvatarUseCase(avatarApi);
  },
  inject: [AvatarApiService],
};
