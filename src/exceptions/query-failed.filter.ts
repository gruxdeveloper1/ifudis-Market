import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryFailedFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Extraer información del error
    const errorMessage = (exception as any).detail || exception.message;

    // Comprobar si es un error de clave duplicada
    let message = 'Database Error';
    if (
      errorMessage.includes('llave duplicada') ||
      errorMessage.includes('duplicate key')
    ) {
      message = 'El registro ya existe en la base de datos.';
    }

    this.logger.error(`Database Error: ${errorMessage}`);

    // Devolver la respuesta en JSON
    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: message,
      error: errorMessage,
    });
  }
}
