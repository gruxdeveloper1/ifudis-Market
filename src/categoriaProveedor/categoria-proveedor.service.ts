// src/categoria-proveedor/categoria-proveedor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaProveedor } from 'src/entities/categoria-proveedor.entity';
import { PreRegistro } from 'src/entities/pre-registro.entity';
import { Category } from 'src/entities/category.entity';
import { CreateCategoriaProveedorDto } from 'src/dto/create-categoria-proveedor.dto';

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
}
