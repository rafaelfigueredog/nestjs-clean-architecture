import { AppConfigService } from '@infrastructure/config';
import { Injectable } from '@nestjs/common';

import {
  ClientProxy,
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
  private readonly client: ClientProxy;

  constructor(private readonly appConfigService: AppConfigService) {
    const host = this.appConfigService.getRabbitMqHost();
    const user = this.appConfigService.getRabbitMqUser();
    const pass = this.appConfigService.getRabbitMqPwd();
    const queue = this.appConfigService.getRabbitMqQueue();

    const clientOptions: RmqOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${pass}@${host}`],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    };

    this.client = ClientProxyFactory.create(clientOptions);
  }

  emitToQueue(eventName: string, payload: unknown): void {
    this.client.emit(eventName, payload);
  }
}
