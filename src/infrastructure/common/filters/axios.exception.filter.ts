import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Extract the status code and error data from the exception
    const status = exception.response?.status || 500;
    const message = exception.message || 'An unknown error occurred.';

    // Send the error response to the user
    response.status(status).json({ message });
  }
}
