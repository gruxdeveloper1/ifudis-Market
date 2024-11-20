import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
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
}
