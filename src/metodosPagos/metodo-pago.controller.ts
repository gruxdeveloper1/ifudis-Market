import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateMetodoPagoDto } from 'src/dto/create-metodo-pago.dto';
import { MetodoPago } from 'src/entities/metodos-pagos';
import { MetodoPagoService } from './metodo-pago.service';

@Controller('metodos_pagos')
export class MetodoPagoController {
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Post()
  @ApiBody({
    description: 'Crear un nuevo método de pago',
    type: CreateMetodoPagoDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Método de pago creado exitosamente',
    type: MetodoPago,
  })
  async create(
    @Body() createMetodoPagoDto: CreateMetodoPagoDto,
  ): Promise<MetodoPago> {
    return this.metodoPagoService.create(createMetodoPagoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de métodos de pago',
    type: [MetodoPago],
  })
  async findAll(): Promise<MetodoPago[]> {
    return this.metodoPagoService.findAll();
  }
}
