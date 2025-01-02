import { Controller, Get, Post, Body, Param, HttpException, Put, HttpStatus, Patch } from '@nestjs/common';
import { PreRegistroService } from './pre-registro.service';
import { PreRegistro } from '../entities/pre-registro.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePreRegistroDto } from 'src/dto/CreatePreRegistroDto';
import { UpdatePreRegistroDto } from 'src/dto/UpdatePreRegistro.dto';

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
  @Get(':id_pre_registro')
  @ApiOperation({ summary: 'Buscar un pre-registro por ID' })
  @ApiResponse({
    status: 200,
    description: 'El pre-registro encontrado.',
    type: PreRegistro,
  })
  @ApiResponse({ status: 404, description: 'Pre-registro no encontrado.' })
  async findByIdPreRegistro(
    @Param('id_pre_registro') idPreRegistro: number,
  ): Promise<PreRegistro> {
    const preRegistro = await this.preRegistroService.findByIdPreRegistro(idPreRegistro);
    if (!preRegistro) {
      throw new HttpException('Pre-registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return preRegistro;
  }

  @Put(':id_pre_registro')
  @ApiOperation({ summary: 'Actualizar un pre-registro por ID' })
  @ApiResponse({
    status: 200,
    description: 'El pre-registro actualizado.',
    type: PreRegistro,
  })
  @ApiResponse({ status: 404, description: 'Pre-registro no encontrado.' })
  async update(
    @Param('id_pre_registro') idPreRegistro: number,
    @Body() updatePreRegistroDto: UpdatePreRegistroDto,
  ): Promise<PreRegistro> {
    const updated = await this.preRegistroService.updateByIdPreRegistro(
      idPreRegistro,
      updatePreRegistroDto,
    );
    if (!updated) {
      throw new HttpException('Pre-registro no encontrado', HttpStatus.NOT_FOUND);
    }
    return updated;
  }

  @Patch(':id_pre_registro/approve')
  @ApiOperation({ summary: 'Aprobar un pre-registro' })
  @ApiResponse({
    status: 200,
    description: 'El pre-registro ha sido aprobado.',
  })
  async approvePreRegistro(@Param('id_pre_registro') idPreRegistro: string) {
    const idAsNumber = parseInt(idPreRegistro, 10);
    if (isNaN(idAsNumber)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }
    return this.preRegistroService.approvePreRegistro(idAsNumber);
  }

  @Patch(':id_pre_registro/reject')
  @ApiBody({
    description: 'Actualización del pre-registro',
    examples: {
      approve: {
        summary: 'Rechazar',
        description: 'JSON para rechazar el pre-registro',
        value: {
          estatus: false,
          observacion: 'No cumple con los requisitos',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Rechazar un pre-registro con observación' })
  @ApiResponse({
    status: 200,
    description: 'El pre-registro ha sido rechazado.',
  })
  async rejectPreRegistro(
    @Param('id_pre_registro') idPreRegistro: string,
    @Body('observacion') observacion: string,
  ) {
    const idAsNumber = parseInt(idPreRegistro, 10);
    if (isNaN(idAsNumber)) {
      throw new HttpException('ID inválido', HttpStatus.BAD_REQUEST);
    }

    if (!observacion) {
      throw new HttpException(
        'La observación es obligatoria para rechazar.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.preRegistroService.rejectPreRegistro(idAsNumber, observacion);
  }

}
