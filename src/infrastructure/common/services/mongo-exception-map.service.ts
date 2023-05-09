import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MongoExceptionMapService {
  private readonly codeToStatusMap: Record<number, HttpStatus> = {
    11000: HttpStatus.CONFLICT,

    // We can add more mappings as needed
  };

  toHttpStatus(code: number): HttpStatus {
    return this.codeToStatusMap[code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
