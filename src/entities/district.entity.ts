import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Corregimiento } from './corregimiento.entity';
import { Province } from './provincia.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.districts, {
    onDelete: 'CASCADE',
  })
  province: Province;

  @OneToMany(() => Corregimiento, (corregimiento) => corregimiento.district)
  corregimientos: Corregimiento[];
}
