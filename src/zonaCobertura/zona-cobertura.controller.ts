// controladores/zona-cobertura.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearZonaCoberturaDto } from 'src/dto/crear-zona-cobertura.dto';
import { ZonaCobertura } from 'src/entities/zona-cobertura.entity';
import { ZonaCoberturaService } from './zona-cobertura.service';

@Controller('zona-cobertura')
export class ZonaCoberturaController {
  constructor(private readonly zonaCoberturaService: ZonaCoberturaService) {}

  // Endpoint para crear una nueva zona de cobertura
  @Post()
  crear(
    @Body() crearZonaCoberturaDto: CrearZonaCoberturaDto,
  ): Promise<ZonaCobertura> {
    return this.zonaCoberturaService.crear(crearZonaCoberturaDto);
  }

  // Endpoint para obtener la lista de zonas de cobertura
  @Get()
  encontrarTodas(): Promise<ZonaCobertura[]> {
    return this.zonaCoberturaService.encontrarTodas();
  }
}
