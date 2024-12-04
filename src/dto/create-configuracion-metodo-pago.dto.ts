import { ApiProperty } from '@nestjs/swagger';

export class CreateConfiguracionMetodoPagoDto {
  @ApiProperty()
  metodoPagoId: number;

  @ApiProperty()
  contadoPrevioEntrega: boolean;

  @ApiProperty()
  contadoContraEntrega: boolean;

  @ApiProperty()
  abonoMitad: boolean;

  @ApiProperty()
  montoMinimo: number;

  @ApiProperty()
  usuarioYappy: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  yappy: string;

  @ApiProperty()
  titularCuentaBanco: string;

  @ApiProperty()
  tipoCuenta: string;

  @ApiProperty()
  numeroCuenta: string;
}
