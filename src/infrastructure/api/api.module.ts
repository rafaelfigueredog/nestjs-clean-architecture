import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from '@app/infrastructure/config';
import { AvatarApiService, UsersApiService } from './services';

@Global()
@Module({
  imports: [AppConfigModule, HttpModule],
  controllers: [],
  providers: [UsersApiService, AvatarApiService],
  exports: [UsersApiService, AvatarApiService],
})
export class ApiModule {}
