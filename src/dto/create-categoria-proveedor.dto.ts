// src/dto/create-categoria-proveedor.dto.ts
import { IsInt, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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