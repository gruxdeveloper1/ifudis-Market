import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  /*@ManyToOne(() => Category) // Relación con la categoría
  @JoinColumn({ name: 'id_categoria' })*/
  @Column()
  id_categoria: number;

  @Column({ type: 'enum', enum: ['stock', 'agotado'], default: 'stock' }) // Estatus del inventario
  inventario: 'stock' | 'agotado';

  @Column({ default: true }) // Campo booleano de activo
  activo: boolean;

  @Column('decimal', { precision: 10, scale: 2 }) // Precio del producto
  precio: number;

  @Column({
    type: 'enum',
    enum: ['unidad', 'kilogramos', 'gramos'],
    default: 'unidad',
  }) // Presentación del producto
  presentacion: 'unidad' | 'kilogramos' | 'gramos';
}
