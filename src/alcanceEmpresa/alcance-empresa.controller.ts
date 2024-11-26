import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearAlcanceEmpresaDto } from 'src/dto/crear-alcance-empresa.dto';
import { AlcanceEmpresa } from 'src/entities/alcance-empresa.entity';
import { AlcanceEmpresaService } from './alcance-empresa.service';
@Controller('alcance-empresa')
export class AlcanceEmpresaController {
  constructor(private readonly alcanceEmpresaService: AlcanceEmpresaService) {}
  @Post()
  crear(
    @Body() crearAlcanceEmpresaDto: CrearAlcanceEmpresaDto,
  ): Promise<AlcanceEmpresa> {
    return this.alcanceEmpresaService.crear(crearAlcanceEmpresaDto);
  }
  @Get()
  encontrarTodos(): Promise<AlcanceEmpresa[]> {
    return this.alcanceEmpresaService.encontrarTodos();
  }
}
