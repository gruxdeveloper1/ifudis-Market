import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlcanceEmpresa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  zonaCoberturaId: number;
  @Column({ nullable: true })
  delivery: boolean;
  @Column({ nullable: true })
  precio: number;
  @Column({ nullable: true })
  tiempoAproxEntrega: number;
  @Column({ nullable: true })
  entregaGratis: boolean;
  @Column({ nullable: true })
  montoMinimoEntregaGratis: number;
}
