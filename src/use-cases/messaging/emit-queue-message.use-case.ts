import { MessageQueueEmitter } from '@domain/contracts';

export class EmitQueueMessageUseCase<T> {
  constructor(private messageQueueEmitter: MessageQueueEmitter<T>) {}

  async execute(message: string, payload: T): Promise<void> {
    return this.messageQueueEmitter.emitMessage(message, payload);
  }
}
