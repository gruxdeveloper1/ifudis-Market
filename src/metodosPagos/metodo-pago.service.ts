import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetodoPagoDto } from 'src/dto/create-metodo-pago.dto';
import { MetodoPago } from 'src/entities/metodos-pagos';
import { Repository } from 'typeorm';

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);
    return this.metodoPagoRepository.save(metodoPago);
  }

  async findAll(): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find();
  }
}
