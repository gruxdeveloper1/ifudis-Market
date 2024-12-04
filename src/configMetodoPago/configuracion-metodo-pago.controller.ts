import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateConfiguracionMetodoPagoDto } from 'src/dto/create-configuracion-metodo-pago.dto';
import { ConfiguracionMetodoPago } from 'src/entities/configuracion-metodo-pago';
import { ConfiguracionMetodoPagoService } from './configuracion-metodo-pago.service';

@Controller('configuracion_metodo_pago')
export class ConfiguracionMetodoPagoController {
  constructor(
    private readonly configuracionMetodoPagoService: ConfiguracionMetodoPagoService,
  ) {}

  @Post()
  @ApiBody({
    description: 'Configurar un método de pago',
    type: CreateConfiguracionMetodoPagoDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Configuración de método de pago creada exitosamente',
    type: ConfiguracionMetodoPago,
  })
  async create(
    @Body() createConfiguracionMetodoPagoDto: CreateConfiguracionMetodoPagoDto,
  ): Promise<ConfiguracionMetodoPago> {
    return this.configuracionMetodoPagoService.create(
      createConfiguracionMetodoPagoDto,
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de configuraciones de métodos de pago',
    type: [ConfiguracionMetodoPago],
  })
  async findAll(): Promise<ConfiguracionMetodoPago[]> {
    return this.configuracionMetodoPagoService.findAll();
  }
}
