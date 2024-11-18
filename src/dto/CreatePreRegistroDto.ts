// src/pre-registro/dto/pre-registro.dto.ts
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePreRegistroDto {
  @ApiProperty({ description: 'Nombres del usuario', example: 'Juan' })
  @IsString()
  nombres: string;

  @ApiProperty({ description: 'Apellidos del usuario', example: 'Pérez' })
  @IsString()
  apellidos: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'MiEmpresa',
    required: false,
  })
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiProperty({
    description: 'ID del estatus de correo',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  estatus_correo?: number;

  @ApiProperty({
    description: 'Estatus del registro false que no ha sido aprobado',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  estatus?: boolean;
}
