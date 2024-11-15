// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 50 })
  nombre_usuario: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ length: 20 })
  tipo_usuario: 'restaurante' | 'proveedor' | 'admin';

  @Column({ length: 20, default: 'activo' })
  estado: 'activo' | 'suspendido' | 'inactivo';

  @Column({ length: 20, nullable: true })
  telefono?: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_ultima_conexion?: Date;

  @Column({ length: 255, nullable: true })
  token_reset_password?: string;
}
