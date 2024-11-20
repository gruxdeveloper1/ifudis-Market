import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocationsService } from './ubicacion.service';

@ApiTags('ubicacion')
@Controller('ubicacion')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // Provincias
  @Post('provincia')
  @ApiOperation({ summary: 'Crear una nueva provincia' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Panamá' },
      },
      required: ['name'],
    },
  })
  async createProvince(@Body('name') name: string) {
    return this.locationsService.createProvince(name);
  }

  @Get('provincia')
  @ApiOperation({ summary: 'Obtener todas las provincias' })
  async getProvinces() {
    return this.locationsService.getProvinces();
  }

  // Distritos
  @Post('distrito')
  @ApiOperation({ summary: 'Crear un nuevo distrito' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'San Miguelito' },
        provinceId: { type: 'number', example: 1 },
      },
      required: ['name', 'provinceId'],
    },
  })
  async createDistrict(
    @Body('name') name: string,
    @Body('provinceId') provinceId: number,
  ) {
    return this.locationsService.createDistrict(name, provinceId);
  }

  @Get('distrito')
  @ApiOperation({ summary: 'Obtener todos los distritos de una provincia' })
  @ApiQuery({
    name: 'provinceId',
    type: 'number',
    description: 'ID de la provincia para filtrar los distritos',
    example: 1,
    required: true,
  })
  async getDistricts(@Query('provinceId') provinceId: number) {
    return this.locationsService.getDistricts(provinceId);
  }

  // Corregimientos
  @Post('corregimientos')
  @ApiOperation({ summary: 'Crear un nuevo corregimiento' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Belisario Frías' },
        districtId: { type: 'number', example: 1 },
      },
      required: ['name', 'districtId'],
    },
  })
  async createCorregimiento(
    @Body('name') name: string,
    @Body('districtId') districtId: number,
  ) {
    return this.locationsService.createCorregimiento(name, districtId);
  }

  @Get('corregimientos')
  @ApiOperation({ summary: 'Obtener todos los corregimientos de un distrito' })
  @ApiQuery({
    name: 'districtId',
    type: 'number',
    description: 'ID del distrito para filtrar los corregimientos',
    example: 1,
    required: true,
  })
  async getCorregimientos(@Query('districtId') districtId: number) {
    return this.locationsService.getCorregimientos(districtId);
  }
}
