import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
