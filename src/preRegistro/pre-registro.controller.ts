import { Controller, Get, Post, Body } from '@nestjs/common';
import { PreRegistroService } from './pre-registro.service';
import { PreRegistro } from '../entities/pre-registro.entity';
import { ApiResponse } from '@nestjs/swagger';
import { CreatePreRegistroDto } from 'src/dto/CreatePreRegistroDto';

@Controller('pre-registro')
export class PreRegistroController {
  constructor(private readonly preRegistroService: PreRegistroService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreatePreRegistroDto,
  })
  async create(@Body() preRegistroData: Partial<PreRegistro>) {
    return this.preRegistroService.create(preRegistroData);
  }

  @Get()
  async findAll() {
    return this.preRegistroService.findAll();
  }
}
