import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePreRegistroDto } from 'src/dto/CreatePreRegistroDto';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { PreRegistro } from '../entities/pre-registro.entity';
import { UpdatePreRegistroDto } from 'src/dto/UpdatePreRegistro.dto';

@Injectable()
export class PreRegistroService {
  constructor(
    @InjectRepository(PreRegistro)
    private readonly preRegistroRepository: Repository<PreRegistro>,
    private readonly emailService: EmailService, // Inyectamos el servicio de correo
  ) {}

  async create(
    createPreRegistroDto: CreatePreRegistroDto,
  ): Promise<PreRegistro> {
    const preRegistro = this.preRegistroRepository.create(createPreRegistroDto);

    const savedPreRegistro = await this.preRegistroRepository.save(preRegistro);
    const subject = 'Registro Exitoso';
    const text = `Hola ${preRegistro.nombres},\n\nGracias por tu registro, estás siendo evaluado. Te contactaremos pronto.`;

    await this.emailService.sendConfirmationEmail(
      preRegistro.email,
      subject,
      text,
    );

    // Devolver el objeto completo que incluye el id generado
    return savedPreRegistro;
  }

  /*async create(preRegistroData: Partial<PreRegistro>) {
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
  }*/

  async findAll(): Promise<PreRegistro[]> {
    return this.preRegistroRepository.find();
  }

  async findByIdPreRegistro(idPreRegistro: number): Promise<PreRegistro | null> {
    return this.preRegistroRepository.findOne({ where: { id_pre_registro: idPreRegistro } });
  }

  async updateByIdPreRegistro(
    idPreRegistro: number,
    updatePreRegistroDto: UpdatePreRegistroDto,
  ): Promise<PreRegistro | null> {
    const preRegistro = await this.findByIdPreRegistro(idPreRegistro);
    if (!preRegistro) return null;

    const updatedPreRegistro = this.preRegistroRepository.merge(preRegistro, updatePreRegistroDto);
    return this.preRegistroRepository.save(updatedPreRegistro);
  }

  async approvePreRegistro(idPreRegistro: number): Promise<PreRegistro> {
    const preRegistro = await this.preRegistroRepository.findOne({ where: { id_pre_registro: idPreRegistro } });

    if (!preRegistro) {
      throw new NotFoundException('Pre-registro no encontrado.');
    }

    preRegistro.estatus = true; // Cambia el estatus a true
    preRegistro.observacion = null; // Elimina cualquier observación previa
    return this.preRegistroRepository.save(preRegistro);
  }

  async rejectPreRegistro(
    idPreRegistro: number,
    observacion: string,
  ): Promise<PreRegistro> {
    const preRegistro = await this.preRegistroRepository.findOne({ where: { id_pre_registro: idPreRegistro } });

    if (!preRegistro) {
      throw new NotFoundException('Pre-registro no encontrado.');
    }

    preRegistro.estatus = false; // Cambia el estatus a false si es necesario
    preRegistro.observacion = observacion; // Agrega el motivo del rechazo
    return this.preRegistroRepository.save(preRegistro);
  }


}
