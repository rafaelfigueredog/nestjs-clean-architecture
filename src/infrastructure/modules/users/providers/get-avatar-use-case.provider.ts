import { Provider } from '@nestjs/common';

import {
  GetBase64ImageUseCase,
  SaveAvatarUseCase,
  GetApiAvatarUseCase,
  GetAvatarUseCase,
  GetLocalAvatarUseCase,
} from '@app/use-cases';

export const GetAvatarUseCaseProvider: Provider = {
  provide: GetAvatarUseCase,
  useFactory: (
    getApiAvatarUseCase: GetApiAvatarUseCase,
    saveAvatarUseCase: SaveAvatarUseCase,
    getLocalAvatarUseCase: GetLocalAvatarUseCase,
    getBase64ImageUseCase: GetBase64ImageUseCase
  ) => {
    return new GetAvatarUseCase(
      getApiAvatarUseCase,
      saveAvatarUseCase,
      getLocalAvatarUseCase,
      getBase64ImageUseCase
    );
  },
  inject: [
    GetApiAvatarUseCase,
    SaveAvatarUseCase,
    GetLocalAvatarUseCase,
    GetBase64ImageUseCase,
  ],
};
