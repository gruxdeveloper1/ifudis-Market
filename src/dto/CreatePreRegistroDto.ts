// src/pre-registro/dto/pre-registro.dto.ts
import { IsString, IsArray, IsInt, IsEmail } from 'class-validator';

export class CreatePreRegistroDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  empresa: string;

  @IsString()
  estatus_correo: string;

  @IsString()
  estatus: string;

  // Campo para las categorías seleccionadas
  @IsArray()
  @IsInt({ each: true })  // Validamos que cada elemento del array sea un número entero
  categorias: number[];    // Lista de IDs de las categorías seleccionadas
}
