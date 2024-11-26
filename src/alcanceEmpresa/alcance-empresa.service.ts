import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearAlcanceEmpresaDto } from 'src/dto/crear-alcance-empresa.dto';
import { AlcanceEmpresa } from 'src/entities/alcance-empresa.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AlcanceEmpresaService {
  constructor(
    @InjectRepository(AlcanceEmpresa)
    private alcanceEmpresaRepository: Repository<AlcanceEmpresa>,
  ) {}
  async crear(
    crearAlcanceEmpresaDto: CrearAlcanceEmpresaDto,
  ): Promise<AlcanceEmpresa> {
    const alcanceEmpresa = this.alcanceEmpresaRepository.create(
      crearAlcanceEmpresaDto,
    );
    return this.alcanceEmpresaRepository.save(alcanceEmpresa);
  }
  async encontrarTodos(): Promise<AlcanceEmpresa[]> {
    return this.alcanceEmpresaRepository.find();
  }
}
