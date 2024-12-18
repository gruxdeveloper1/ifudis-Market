import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { Producto } from 'src/entities/producto.entity';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Crear un producto
  @Post()
  @ApiBody({ description: 'Crear un nuevo producto', type: CreateProductoDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    type: Producto,
  })
  async create(
    @Body() createProductoDto: CreateProductoDto,
  ): Promise<Producto> {
    return this.productoService.create(createProductoDto);
  }

  // Obtener todos los productos
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
    type: [Producto],
  })
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  // Obtener un producto por ID
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    type: Producto,
  })
  async findOne(@Param('id') id: number): Promise<Producto> {
    return this.productoService.findOne(id);
  }

  // Actualizar un producto
  @Put(':id')
  @ApiBody({ description: 'Actualizar un producto', type: CreateProductoDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado',
    type: Producto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateProductoDto: CreateProductoDto,
  ): Promise<Producto> {
    return this.productoService.update(id, updateProductoDto);
  }

  // Eliminar un producto
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productoService.remove(id);
  }

  @Get('search/:term')
  @ApiOperation({ summary: 'Buscar productos por nombre' })
  @ApiParam({
    name: 'term',
    required: true,
    type: String,
    description: 'Término de búsqueda',
  })
  @ApiResponse({
    status: 200,
    description: 'Productos encontrados',
    type: [Producto],
  })
  async search(@Param('term') term: string): Promise<Producto[]> {
    console.log('Término de búsqueda recibido:', term); // Verifica que esto se imprima
    return this.productoService.searchProductosByName(term);
  }
}
