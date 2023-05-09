import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '@infrastructure/config';
import { schemas } from '@infrastructure/db/mongo/model';
import { AppConfigService } from '@infrastructure/config';
import { MongooseService } from '@infrastructure/db/mongo/services';
import { MongoAvatarRepository, MongoUserRepository } from './repositories';
@Global()
@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forFeature(schemas),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
      imports: [AppConfigModule],
      inject: [AppConfigService],
    }),
  ],
  providers: [MongoUserRepository, MongoAvatarRepository],
  exports: [MongoUserRepository, MongoAvatarRepository],
})
export class MongoDbModule {}
