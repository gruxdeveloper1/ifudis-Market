import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class UpdateCategoriaProveedorDto {
  @ApiProperty({
    description: 'Lista de IDs de categorías a asignar al pre-registro.',
    example: [2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  id_categorias: number[];
}
