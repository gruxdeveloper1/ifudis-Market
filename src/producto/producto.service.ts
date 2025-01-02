import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { UpdateProductoDto } from 'src/dto/update-producto.dto';
import { Producto } from 'src/entities/producto.entity';
import { ILike, Repository } from 'typeorm';

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
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    Object.assign(producto, updateProductoDto);

    try {
      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el producto', error.message);
    }
  }

  async remove(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
  async searchProductosByName(searchTerm: string): Promise<Producto[]> {
    console.log('Buscando productos por nombre con el término:', searchTerm); // Verifica que esto se imprima
    return this.productoRepository.find({
      where: {
        nombre: ILike(`%${searchTerm}%`), // Buscar solo por nombre
      },
    });
  }
}
