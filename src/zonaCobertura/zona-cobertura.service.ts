// servicios/zona-cobertura.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearZonaCoberturaDto } from 'src/dto/crear-zona-cobertura.dto';
import { ZonaCobertura } from 'src/entities/zona-cobertura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonaCoberturaService {
  constructor(
    @InjectRepository(ZonaCobertura)
    private zonaCoberturaRepository: Repository<ZonaCobertura>,
  ) {}

  // Método para crear una nueva zona de cobertura
  async crear(
    crearZonaCoberturaDto: CrearZonaCoberturaDto,
  ): Promise<ZonaCobertura> {
    const zonaCobertura = this.zonaCoberturaRepository.create(
      crearZonaCoberturaDto,
    );
    return this.zonaCoberturaRepository.save(zonaCobertura);
  }

  // Método para obtener todas las zonas de cobertura
  async encontrarTodas(): Promise<ZonaCobertura[]> {
    return this.zonaCoberturaRepository.find();
  }
}
