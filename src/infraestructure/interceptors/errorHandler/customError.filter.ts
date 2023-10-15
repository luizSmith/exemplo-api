import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionData = exception.getResponse();
        // this filter is used to set global exception info. ie: timestamp
        const responsePattern = Object.assign(exceptionData, {
            timestamp: new Date().toISOString(),
        });
        response.status(status).json(responsePattern);
    }
}
