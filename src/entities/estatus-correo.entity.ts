import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estatus_correo')
export class EstatusCorreo {
  @PrimaryGeneratedColumn()
  id_estatus: number;

  @Column({ length: 50 })
  descripcion: string;
}
