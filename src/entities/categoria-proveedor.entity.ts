// src/entities/categoria-proveedor.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PreRegistro } from './pre-registro.entity';
import { Category } from './category.entity';

@Entity('categoria_proveedor')
export class CategoriaProveedor {
  @PrimaryGeneratedColumn()
  id_categoria_proveedor: number;

  @ManyToOne(() => PreRegistro)
  @JoinColumn({ name: 'id_pre_registro' })
  preRegistro: PreRegistro;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Category;
}
