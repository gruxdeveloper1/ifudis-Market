// src/categoria-proveedor/categoria-proveedor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoriaProveedorDto } from 'src/dto/create-categoria-proveedor.dto';
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
    id_categorias: number[],
  ): Promise<CategoriaProveedor[]> {
    console.log('ID Pre Registro recibido:', id_pre_registro);
    console.log('IDs de Categorías recibidos:', id_categorias);

    // Verificar si el pre-registro existe
    const preRegistro = await this.preRegistroRepository.findOne({
      where: { id_pre_registro },
    });

    if (!preRegistro) {
      throw new NotFoundException('El pre-registro especificado no existe.');
    }

    // Eliminar relaciones existentes para el pre-registro
    await this.categoriaProveedorRepository.delete({
      preRegistro,
    });

    // Obtener las instancias de Categoria
    const categorias = await this.categoryRepository.findByIds(id_categorias);

    // Crear nuevas relaciones con las instancias de PreRegistro y Categoria
    const nuevasRelaciones = id_categorias.map((id_categoria) => {
      return this.categoriaProveedorRepository.create({
        preRegistro, // Pasar la instancia de PreRegistro
        categoria: categorias.find((c) => c.id_categoria === id_categoria), // Encontrar la instancia de Categoria
      });
    });

    const categoriasGuardadas =
      await this.categoriaProveedorRepository.save(nuevasRelaciones);

    console.log('Categorías actualizadas:', categoriasGuardadas);
    return categoriasGuardadas;
  }
}
