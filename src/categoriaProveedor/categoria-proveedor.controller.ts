import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoriaProveedorDto } from 'src/dto/create-categoria-proveedor.dto';
import { UpdateCategoriaProveedorDto } from 'src/dto/update-categoria-proveedor.dto';
import { CategoriaProveedor } from 'src/entities/categoria-proveedor.entity';
import { CategoriaProveedorService } from './categoria-proveedor.service';
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

  @Get(':id_pre_registro')
  @ApiOperation({ summary: 'Obtener categorías por ID de pre-registro' })
  @ApiResponse({
    status: 200,
    description: 'Categorías obtenidas exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'No se encontraron categorías.' })
  async findByIdPreRegistro(
    @Param('id_pre_registro') id_pre_registro: number,
  ): Promise<CategoriaProveedor[]> {
    const categorias =
      await this.categoriaProveedorService.findByIdPreRegistro(id_pre_registro);
    if (!categorias || categorias.length === 0) {
      throw new NotFoundException(
        'No se encontraron categorías para este pre-registro.',
      );
    }
    return categorias;
  }

  @Put(':id_pre_registro')
  @ApiOperation({ summary: 'Actualizar categorías por ID de pre-registro' })
  @ApiResponse({
    status: 200,
    description: 'Categorías actualizadas exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron categorías para actualizar.',
  })
  async updateByIdPreRegistro(
    @Param('id_pre_registro') id_pre_registro: number,
    @Body() updateCategoriaProveedorDto: UpdateCategoriaProveedorDto,
  ): Promise<CategoriaProveedor[]> {
    const updatedCategorias =
      await this.categoriaProveedorService.updateByIdPreRegistro(
        id_pre_registro,
        updateCategoriaProveedorDto,
      );
    if (!updatedCategorias || updatedCategorias.length === 0) {
      throw new NotFoundException(
        'No se encontraron categorías para actualizar.',
      );
    }
    return updatedCategorias;
  }
}
