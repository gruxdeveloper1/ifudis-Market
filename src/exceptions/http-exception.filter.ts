import { ExceptionFilter, Catch, ArgumentsHost, ValidationError } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Si es una BadRequestException (generalmente por validación)
    if (status === HttpStatus.BAD_REQUEST && exceptionResponse.message) {
      const validationErrors = exceptionResponse.message;
      // Formatea los errores de validación
      const formattedErrors = Array.isArray(validationErrors)
        ? validationErrors.map((error: ValidationError) => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
          }))
        : validationErrors;

      // Responde con los detalles de los errores de validación
      return response.status(status).json({
        statusCode: status,
        message: 'Errores de validación encontrados',
        errors: formattedErrors,
      });
    }

    // Para otros tipos de excepciones
    const errorResponse = {
      statusCode: status,
      message:
        status === HttpStatus.BAD_REQUEST
          ? 'Asegúrate de que todos los campos requeridos estén completos.'
          : exception.message,
      error: exception.name,
    };

    response.status(status).json(errorResponse);
  }
}