// src/categories/dto/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  readonly itbms: string;
}
