import { CreateUserDto, UserDto } from '@infrastructure/modules/users/dtos';
import { CreateUserUseCase, UserNotificationsUseCase } from '@app/use-cases';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserMapper } from '../mappers';

import {
  Controller,
  Post,
  Body,
  UsePipes,
  Inject,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

// Controller prefix: /api/users/

@Controller('users')
@ApiTags('Users Controller')
export class UsersController {
  constructor(
    @Inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase,
    @Inject(UserNotificationsUseCase)
    private userNotificationsUseCase: UserNotificationsUseCase,
    private userMapper: UserMapper
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: UserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const entity = this.userMapper.toEntity(createUserDto);
    const user = await this.createUserUseCase.execute(entity);
    this.userNotificationsUseCase.execute(user);
    return this.userMapper.toDto(user);
  }
}
