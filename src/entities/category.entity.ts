// src/categories/entities/category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoria')
export class Category {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column({ default: true })
  estatus: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
