// src/categoria-proveedor/categoria-proveedor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaProveedorDto } from 'src/dto/create-categoria-proveedor.dto';
import { UpdateCategoriaProveedorDto } from 'src/dto/update-categoria-proveedor.dto';
import { CategoriaProveedor } from 'src/entities/categoria-proveedor.entity';
import { Category } from 'src/entities/category.entity';
import { PreRegistro } from 'src/entities/pre-registro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaProveedorService {
  constructor(
    @InjectRepository(CategoriaProveedor)
    private readonly categoriaProveedorRepository: Repository<CategoriaProveedor>,

    @InjectRepository(PreRegistro)
    private readonly preRegistroRepository: Repository<PreRegistro>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoriaProveedorDto: CreateCategoriaProveedorDto,
  ): Promise<CategoriaProveedor[]> {
    const { id_pre_registro, id_categorias } = createCategoriaProveedorDto;

    const preRegistro = await this.preRegistroRepository.findOneBy({
      id_pre_registro,
    });
    if (!preRegistro) {
      throw new NotFoundException('PreRegistro no encontrado');
    }

    const categorias = await this.categoryRepository.findByIds(id_categorias);
    if (categorias.length !== id_categorias.length) {
      throw new NotFoundException('Algunas categorías no se encontraron');
    }

    const categoriaProveedorArray: CategoriaProveedor[] = categorias.map(
      (categoria) => {
        const categoriaProveedor = new CategoriaProveedor();
        categoriaProveedor.preRegistro = preRegistro;
        categoriaProveedor.categoria = categoria;
        return categoriaProveedor;
      },
    );

    return this.categoriaProveedorRepository.save(categoriaProveedorArray);
  }

  async findByIdPreRegistro(
    id_pre_registro: number,
  ): Promise<CategoriaProveedor[]> {
    return this.categoriaProveedorRepository.find({
      where: {
        preRegistro: { id_pre_registro: id_pre_registro }, // Accede al ID del objeto relacionado
      },
      relations: ['preRegistro', 'categoria'], // Incluye relaciones si necesitas datos adicionales
    });
  }

  async updateByIdPreRegistro(
    id_pre_registro: number,
    updateCategoriaProveedorDto: UpdateCategoriaProveedorDto,
  ): Promise<CategoriaProveedor[]> {
    // Filtra por la relación 'preRegistro' y su campo 'id'
    const categorias = await this.categoriaProveedorRepository.find({
      where: {
        preRegistro: { id_pre_registro: id_pre_registro }, // Accede a 'id_pre_registro' de la relación 'preRegistro'
      },
      relations: ['preRegistro', 'categoria'], // Incluye relaciones si necesitas datos adicionales
    });

    if (!categorias || categorias.length === 0) {
      return [];
    }

    for (const categoria of categorias) {
      Object.assign(categoria, updateCategoriaProveedorDto);
      await this.categoriaProveedorRepository.save(categoria);
    }

    return categorias;
  }
}
