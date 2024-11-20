import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { ContactPerson } from './contact-person.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logo: string;

  @Column()
  description: string;

  @Column()
  businessName: string;

  @Column()
  taxpayerType: string;

  @Column()
  rucDv: string;

  @OneToOne(() => Address,  { cascade: true }) // Configura la relación OneToOne
  @JoinColumn() // Especifica qué columna contiene la relación
  address: Address;

  @OneToOne(() => ContactPerson,  { cascade: true })
  @JoinColumn()
  contactPerson: ContactPerson;
}
