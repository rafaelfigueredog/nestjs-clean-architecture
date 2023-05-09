import { Global, Module } from '@nestjs/common';
import { RabbitMqService, RmqUsersEmitterService } from './services';
import { AppConfigModule } from '@app/infrastructure/config';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [RabbitMqService, RmqUsersEmitterService],
  exports: [RabbitMqService, RmqUsersEmitterService],
})
export class RabbitMqModule {}
