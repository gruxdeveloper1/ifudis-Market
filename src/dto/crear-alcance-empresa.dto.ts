import { ApiProperty } from '@nestjs/swagger';

export class CrearAlcanceEmpresaDto {
  @ApiProperty()
  readonly zonaCoberturaId?: number;

  @ApiProperty()
  readonly delivery?: boolean;

  @ApiProperty()
  readonly precio?: number;

  @ApiProperty()
  readonly tiempoAproxEntrega?: number;

  @ApiProperty()
  readonly entregaGratisA?: boolean;

  @ApiProperty()
  readonly montoMinimoEntregaGratis?: number;
}
