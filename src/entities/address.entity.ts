import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provinceId: number;

  @Column()
  cityId: number;

  @Column()
  districtId: number;

  @Column()
  postalCode: string;

  @Column()
  address: string;
}
