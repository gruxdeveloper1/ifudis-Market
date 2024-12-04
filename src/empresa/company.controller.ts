import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BusinessDto } from 'src/dto/create-company.dto';
import { Company } from 'src/entities/company.entity';
import { CompanyService } from './company.service';

@Controller('empresa')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBody({
    description: 'Datos para crear una nueva empresa',
    type: BusinessDto, // Usar el DTO aquí
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa creada exitosamente',
  })
  async create(@Body() businessDto: BusinessDto): Promise<Company> {
    return this.companyService.create(businessDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las empresas',
    type: [Company], // Indicar que la respuesta será un arreglo de empresas
  })
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID de la empresa a obtener',
  })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada',
    type: Company,
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async findOne(@Param('id') id: number): Promise<Company> {
    return this.companyService.findOne(id);
  }
}
