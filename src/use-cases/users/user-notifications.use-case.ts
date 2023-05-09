import { User } from '@domain/entities';
import { EmitQueueMessageUseCase, SendMailUseCase } from '@app/use-cases';

export class UserNotificationsUseCase {
  constructor(
    private sendMailUseCase: SendMailUseCase,
    private emitQueueMessageUseCase: EmitQueueMessageUseCase<User>
  ) {}

  async execute(user: User): Promise<void> {
    this.sendMailUseCase.execute(user);
    this.emitQueueMessageUseCase.execute('user created: ', user);
  }
}
