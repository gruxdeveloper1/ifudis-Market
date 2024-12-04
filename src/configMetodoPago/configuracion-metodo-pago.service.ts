import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfiguracionMetodoPagoDto } from 'src/dto/create-configuracion-metodo-pago.dto';
import { ConfiguracionMetodoPago } from 'src/entities/configuracion-metodo-pago';
import { Repository } from 'typeorm';

@Injectable()
export class ConfiguracionMetodoPagoService {
  constructor(
    @InjectRepository(ConfiguracionMetodoPago)
    private readonly configuracionMetodoPagoRepository: Repository<ConfiguracionMetodoPago>,
  ) {}

  async create(
    createConfiguracionMetodoPagoDto: CreateConfiguracionMetodoPagoDto,
  ): Promise<ConfiguracionMetodoPago> {
    const configuracion = this.configuracionMetodoPagoRepository.create(
      createConfiguracionMetodoPagoDto,
    );
    return this.configuracionMetodoPagoRepository.save(configuracion);
  }

  async findAll(): Promise<ConfiguracionMetodoPago[]> {
    return this.configuracionMetodoPagoRepository.find({
      relations: ['metodoPago'],
    });
  }
}
