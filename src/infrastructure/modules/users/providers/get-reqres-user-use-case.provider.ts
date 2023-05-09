import { Provider } from '@nestjs/common';
import { GetReqResUserUseCase } from '@app/use-cases';
import { UsersApi } from '@domain/contracts';
import { UsersApiService } from '@infrastructure/api';

export const GetReqResUserUseCaseProvider: Provider = {
  provide: GetReqResUserUseCase,
  useFactory: (usersApi: UsersApi) => {
    return new GetReqResUserUseCase(usersApi);
  },
  inject: [UsersApiService],
};
