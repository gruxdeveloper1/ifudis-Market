// src/dto/create-categoria-proveedor.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateCategoriaProveedorDto {
  @ApiProperty({
    description: 'ID del pre-registro al que se le asignarán las categorías.',
    example: 1,
  })
  @IsInt()
  id_pre_registro: number;

  @ApiProperty({
    description: 'Lista de IDs de categorías a asignar al pre-registro.',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  id_categorias: number[];
}
