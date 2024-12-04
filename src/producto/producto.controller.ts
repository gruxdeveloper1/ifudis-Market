import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
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
}
