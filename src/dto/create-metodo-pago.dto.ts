import { ApiProperty } from '@nestjs/swagger';

export class CreateMetodoPagoDto {
  @ApiProperty()
  descripcion: string;
}
