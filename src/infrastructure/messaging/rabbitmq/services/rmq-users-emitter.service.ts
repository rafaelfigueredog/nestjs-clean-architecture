import { Injectable } from '@nestjs/common';
import { MessageQueueEmitter } from '@domain/contracts';
import { User } from '@domain/entities';
import { RabbitMqService } from './rabbitmq.service';

@Injectable()
export class RmqUsersEmitterService implements MessageQueueEmitter<User> {
  constructor(private rmqService: RabbitMqService) {}

  emitMessage(message: string, data: User): void {
    return this.rmqService.emitToQueue(message, data);
  }
}
