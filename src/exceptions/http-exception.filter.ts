import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Extrae el mensaje de la excepción y lo personaliza
    const errorResponse = {
      statusCode: status,
      message:
        status === HttpStatus.BAD_REQUEST
          ? 'Asegúrate de que todos los campos requeridos estén completos.'
          : exception.message,
      error: exception.name,
    };

    // Envía la respuesta personalizada
    response.status(status).json(errorResponse);
  }
}
