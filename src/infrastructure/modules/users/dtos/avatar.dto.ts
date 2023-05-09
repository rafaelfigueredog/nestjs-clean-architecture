import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AvatarDto {
  @ApiProperty({ format: 'binary' })
  @Transform(({ value }) => `data:image/jpg;base64,${value}`)
  public base64Image: string;

  constructor(base64Image: string) {
    this.base64Image = base64Image;
  }
}
