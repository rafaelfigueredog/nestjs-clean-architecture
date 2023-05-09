import { User } from '@app/domain';
import { Provider } from '@nestjs/common';
import { MessageQueueEmitter } from '@domain/contracts';
import { EmitQueueMessageUseCase } from '@app/use-cases';
import { RmqUsersEmitterService } from '@infrastructure/messaging';

export const EmitQueueMessageUseCaseProvider: Provider = {
  provide: EmitQueueMessageUseCase,
  useFactory: (messageQueueEmitter: MessageQueueEmitter<User>) => {
    return new EmitQueueMessageUseCase(messageQueueEmitter);
  },
  inject: [RmqUsersEmitterService],
};
