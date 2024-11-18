import { Controller, Get, Post, Body } from '@nestjs/common';
import { PreRegistroService } from './pre-registro.service';
import { PreRegistro } from '../entities/pre-registro.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePreRegistroDto } from 'src/dto/CreatePreRegistroDto';

@ApiTags('PreRegistro de proveedor')
@Controller('pre-registro')
export class PreRegistroController {
  constructor(private readonly preRegistroService: PreRegistroService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pre-registro de proveedor' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreatePreRegistroDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createPreRegistroDto: CreatePreRegistroDto,
  ): Promise<PreRegistro> {
    return await this.preRegistroService.create(createPreRegistroDto);
  }

  @Get()
  async findAll() {
    return this.preRegistroService.findAll();
  }
}
