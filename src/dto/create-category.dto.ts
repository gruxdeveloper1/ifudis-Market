// src/categories/dto/create-category.dto.ts
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  readonly nombre: string;

  @ApiProperty()
  @IsString()
  readonly descripcion: string;

  @ApiProperty()
  @IsBoolean()
  readonly estatus: boolean;
}
