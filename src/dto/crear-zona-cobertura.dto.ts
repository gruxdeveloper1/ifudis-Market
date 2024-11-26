import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearZonaCoberturaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la zona es obligatorio' })
  readonly nombre: string;

  @ApiProperty()
  @IsString()
  readonly descripcion?: string;
}
