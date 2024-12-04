import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metodos_pagos')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
}
