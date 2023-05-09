import { Module } from '@nestjs/common';
import { BlobStoreModule, MongoDbModule } from '@infrastructure/db';
import { UsersModule } from '@infrastructure/modules';
import { AppConfigModule } from '@infrastructure/config';
import { RabbitMqModule } from '@infrastructure/messaging';
import { MailerMailModule } from '@infrastructure/mail';
import { ApiModule } from '@infrastructure/api';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    MongoDbModule,
    RabbitMqModule,
    MailerMailModule,
    BlobStoreModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
