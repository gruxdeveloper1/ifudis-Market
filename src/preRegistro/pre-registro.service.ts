import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreRegistro } from '../entities/pre-registro.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PreRegistroService {
  constructor(
    @InjectRepository(PreRegistro)
    private readonly preRegistroRepository: Repository<PreRegistro>,
    private readonly emailService: EmailService, // Inyectamos el servicio de correo
  ) {}

  async create(preRegistroData: Partial<PreRegistro>) {
    // Validación personalizada para campos requeridos
    if (!preRegistroData.nombres || !preRegistroData.apellidos) {
      throw new HttpException(
        'Los campos "nombres" y "apellidos" son obligatorios.',
        HttpStatus.BAD_REQUEST, // O el código de estado que consideres apropiado
      );
    }

    try {
      // Enviar correo de confirmación antes de guardar
      await this.emailService.sendConfirmationEmail(
        preRegistroData.email, // Suponiendo que el correo está en los datos de pre-registro
        'Confirmación de Pre-Registo',
        'Gracias por tu registro, estás siendo evaluado. Te contactaremos pronto.',
      );

      // Si el correo se envió correctamente, guardar el pre-registro
      const preRegistro = this.preRegistroRepository.create(preRegistroData);
      return await this.preRegistroRepository.save(preRegistro);
    } catch (error) {
      throw new HttpException(
        `Error al procesar el pre-registro: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<PreRegistro[]> {
    return this.preRegistroRepository.find();
  }
}
