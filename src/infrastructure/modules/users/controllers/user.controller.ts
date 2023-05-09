import { AvatarDto } from '@infrastructure/modules/users/dtos';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReqResUser } from '@app/domain';

import {
  DeleteAvatarUseCase,
  GetAvatarUseCase,
  GetReqResUserUseCase,
} from '@app/use-cases';

import {
  Controller,
  Get,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MessageDto } from '@app/infrastructure/common';

// Controller prefix: /api/user/

@Controller('user')
@ApiTags('User Controller')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject(GetReqResUserUseCase)
    private getReqResUserUseCase: GetReqResUserUseCase,
    @Inject(GetAvatarUseCase)
    private getAvatarUseCase: GetAvatarUseCase,
    @Inject(DeleteAvatarUseCase)
    private deleteAvatarUseCase: DeleteAvatarUseCase
  ) {}

  @Get(':userId')
  @ApiOkResponse({ type: ReqResUser })
  @ApiParam({ name: 'userId', type: 'number', required: true })
  async getReqResUser(@Param('userId') userId: number): Promise<ReqResUser> {
    const user = await this.getReqResUserUseCase.execute(userId);
    return new ReqResUser(user);
  }

  @Get(':userId/avatar')
  @ApiParam({ name: 'userId', type: 'number', required: true })
  @ApiOkResponse({ type: AvatarDto })
  async getUserAvatar(@Param('userId') userId: number): Promise<AvatarDto> {
    const base64Image = await this.getAvatarUseCase.execute(userId);
    return new AvatarDto(base64Image);
  }

  @Delete(':userId/avatar')
  @ApiParam({ name: 'userId', type: 'number', required: true })
  async deleteUserAvatar(@Param('userId') userId: number): Promise<MessageDto> {
    await this.deleteAvatarUseCase.execute(userId);
    return new MessageDto('Avatar successfully removed.');
  }
}
