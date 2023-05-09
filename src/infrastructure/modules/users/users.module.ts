import { Module } from '@nestjs/common';
import { UserController, UsersController } from './controllers';
import { UserMapper } from './mappers';

import {
  CreateUserUseCaseProvider,
  UserNotificationsUseCaseProvider,
  EmitQueueMessageUseCaseProvider,
  GetReqResUserUseCaseProvider,
  UniqueEmailValidatorProvider,
  SendMailUseCaseProvider,
  GetApiAvatarUseCaseProvider,
  GetLocalAvatarUseCaseProvider,
  GetBase64ImageUseCaseProvider,
  SaveAvatarUseCaseProvider,
  GetAvatarUseCaseProvider,
  DeleteAvatarUseCaseProvider,
} from './providers';

@Module({
  imports: [],
  controllers: [UsersController, UserController],
  providers: [
    UserMapper,

    /* User use-cases */
    CreateUserUseCaseProvider,
    UniqueEmailValidatorProvider,
    UserNotificationsUseCaseProvider,
    EmitQueueMessageUseCaseProvider,
    GetReqResUserUseCaseProvider,
    SendMailUseCaseProvider,

    /* User avatar use-cases */
    GetApiAvatarUseCaseProvider,
    GetLocalAvatarUseCaseProvider,
    GetBase64ImageUseCaseProvider,
    SaveAvatarUseCaseProvider,
    GetAvatarUseCaseProvider,
    DeleteAvatarUseCaseProvider,
  ],
  exports: [],
})
export class UsersModule {}
