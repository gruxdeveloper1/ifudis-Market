import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // Crear un producto
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(producto);
  }

  // Obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Producto> {
    return this.productoRepository.findOne({
      where: { id },
    });
  }

  // Actualizar un producto
  async update(
    id: number,
    updateProductoDto: CreateProductoDto,
  ): Promise<Producto> {
    await this.productoRepository.update(id, updateProductoDto);
    return this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  // Eliminar un producto
  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}
