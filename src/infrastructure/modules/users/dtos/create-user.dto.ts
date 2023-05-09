import { ApiProperty } from '@nestjs/swagger';
import { UniqueEmailValidator } from '@infrastructure/modules/users/validators';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  @Validate(UniqueEmailValidator)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly last_name: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  @ValidateIf((_object, value) => value !== null || value !== undefined)
  readonly avatar: string | undefined;
}
