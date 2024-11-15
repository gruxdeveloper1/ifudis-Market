import { Controller, Get, Post, Body } from '@nestjs/common';
import { PreRegistroService } from './pre-registro.service';
import { PreRegistro } from '../entities/pre-registro.entity';

@Controller('pre-registro')
export class PreRegistroController {
  constructor(private readonly preRegistroService: PreRegistroService) {}

  @Post()
  async create(@Body() preRegistroData: Partial<PreRegistro>) {
    return this.preRegistroService.create(preRegistroData);
  }

  @Get()
  async findAll() {
    return this.preRegistroService.findAll();
  }
}
