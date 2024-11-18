// src/categoria-proveedor/categoria-proveedor.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CategoriaProveedorService } from './categoria-proveedor.service';
import { CreateCategoriaProveedorDto } from 'src/dto/create-categoria-proveedor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriaProveedor } from 'src/entities/categoria-proveedor.entity';

@ApiTags('CategoriaProveedor')
@Controller('categoria-proveedor')
export class CategoriaProveedorController {
  constructor(
    private readonly categoriaProveedorService: CategoriaProveedorService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar categorías para un pre-registro' })
  @ApiResponse({
    status: 201,
    description: 'Categorías registradas exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createCategoriaProveedorDto: CreateCategoriaProveedorDto,
  ): Promise<CategoriaProveedor[]> {
    return this.categoriaProveedorService.create(createCategoriaProveedorDto);
  }
}
