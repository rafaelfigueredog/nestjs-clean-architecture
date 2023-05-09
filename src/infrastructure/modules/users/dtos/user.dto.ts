import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  readonly id?: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  @Transform(({ value }) => value || null)
  readonly avatar?: string;
}
