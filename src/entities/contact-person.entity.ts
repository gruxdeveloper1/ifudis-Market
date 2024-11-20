import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
