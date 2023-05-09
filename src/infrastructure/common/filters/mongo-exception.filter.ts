import { MongoServerError } from 'mongodb';
import { Response } from 'express';
import { MongoExceptionMapService } from '@infrastructure/common';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import * as mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly mongoMapService: MongoExceptionMapService;

  constructor() {
    this.mongoMapService = new MongoExceptionMapService();
  }

  catch(exception: MongoServerError, host: ArgumentsHost) {
    const { message, code } = exception;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.mongoMapService.toHttpStatus(Number(code));

    response.status(status).json({ message });
  }
}
