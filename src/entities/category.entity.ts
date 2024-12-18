// src/categories/entities/category.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('categoria')
export class Category {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', nullable: true })
  itbms?: string;

  @Column({ default: true })
  estatus: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relación OneToMany con Producto
  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[]; // Esta es la propiedad que debes agregar
}
