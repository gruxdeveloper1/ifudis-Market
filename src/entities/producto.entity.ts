import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Category, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' }) // Especificamos la columna que contiene la clave foránea
  categoria: Category; // Esto es lo que antes causaba el error

  @Column({ type: 'enum', enum: ['stock', 'agotado'], default: 'stock' }) // Estatus del inventario
  inventario: 'stock' | 'agotado';

  @Column({ default: true }) // Campo booleano de activo
  activo: boolean;

  @Column('decimal', { precision: 10, scale: 2 }) // Precio del producto
  precio: number;

  @Column({ unique: true })
  sku: string;

  @Column({
    type: 'enum',
    enum: [
      'unidad',
      'libra',
      'kilogramos',
      'gramo',
      'litro',
      'Mililitro',
      'Onzas',
    ],
    default: 'unidad',
  }) // Presentación del producto
  presentacion:
    | 'unidad'
    | 'libra'
    | 'kilogramos'
    | 'gramo'
    | 'litro'
    | 'Mililitro'
    | 'Onzas';
}
