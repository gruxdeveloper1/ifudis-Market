// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto/create-category.dto';  
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity'; 

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Crear una nueva categoría
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Obtener todas las categorías
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Obtener una categoría por su ID
  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id_categoria: id });
  }

  // Actualizar una categoría
  async update(id: number, updateCategoryDto: CreateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  // Eliminar una categoría
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
