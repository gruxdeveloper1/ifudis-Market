import { MetodoPago } from 'src/entities/metodos-pagos';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('configuracion_metodo_pago')
export class ConfiguracionMetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MetodoPago)
  @JoinColumn({ name: 'metodo_pago_id' })
  metodoPago: MetodoPago;

  @Column({ default: false })
  contadoPrevioEntrega: boolean;

  @Column({ default: false })
  contadoContraEntrega: boolean;

  @Column({ default: false })
  abonoMitad: boolean;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  montoMinimo: number;

  @Column({ nullable: true })
  usuarioYappy: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  yappy: string;

  @Column({ nullable: true })
  titularCuentaBanco: string;

  @Column({ nullable: true })
  tipoCuenta: string;

  @Column({ nullable: true })
  numeroCuenta: string;
}
