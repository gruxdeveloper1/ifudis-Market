// src/categories/categories.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { Category } from 'src/entities/category.entity';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Endpoint para crear una categoría
  @Post('newCategoria')
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  // Endpoint para obtener todas las categorías
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  // Endpoint para obtener una categoría por ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  // Endpoint para actualizar una categoría
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // Endpoint para eliminar una categoría
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
