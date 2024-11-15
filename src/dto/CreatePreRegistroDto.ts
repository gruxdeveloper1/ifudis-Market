// src/pre-registro/dto/pre-registro.dto.ts
import { IsString, IsArray, IsInt, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePreRegistroDto {
  @ApiProperty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsString()
  empresa: string;

  @ApiProperty()
  @IsString()
  estatus_correo: string;

  @ApiProperty()
  @IsString()
  estatus: string;

  // Campo para las categorías seleccionadas
  @ApiProperty()
  @IsArray()
  @IsInt({ each: true }) // Validamos que cada elemento del array sea un número entero
  categorias: number[]; // Lista de IDs de las categorías seleccionadas
}
