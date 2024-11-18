import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstatusCorreo } from './estatus-correo.entity';

@Entity('pre_registro')
export class PreRegistro {
  @PrimaryGeneratedColumn()
  id_pre_registro: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100, nullable: true })
  empresa: string;

  @Column()
  estatus_correo: number;

  @Column({ default: true })
  estatus: boolean;
}
