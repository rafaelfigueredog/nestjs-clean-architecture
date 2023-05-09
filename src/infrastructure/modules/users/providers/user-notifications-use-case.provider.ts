import { Provider } from '@nestjs/common';
import { User } from '@app/domain';

import {
  SendMailUseCase,
  UserNotificationsUseCase,
  EmitQueueMessageUseCase,
} from '@app/use-cases';

export const UserNotificationsUseCaseProvider: Provider = {
  provide: UserNotificationsUseCase,
  useFactory: (
    sendMailUseCase: SendMailUseCase,
    emitQueueMessageUseCase: EmitQueueMessageUseCase<User>
  ) => {
    return new UserNotificationsUseCase(
      sendMailUseCase,
      emitQueueMessageUseCase
    );
  },
  inject: [SendMailUseCase, EmitQueueMessageUseCase],
};
