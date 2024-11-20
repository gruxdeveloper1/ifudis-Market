// src/dto/create-user.dto.ts
import { IsString, IsEmail, IsOptional, IsIn, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'johndoe' })
  @IsString()
  @Length(1, 50)
  nombre_usuario: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Tipo de usuario',
    example: 'restaurante',
    enum: ['restaurante', 'proveedor', 'admin'],
  })
  @IsIn(['restaurante', 'proveedor', 'admin'])
  tipo_usuario: 'restaurante' | 'proveedor' | 'admin';

  @ApiProperty({
    description: 'Estado del usuario',
    example: 'activo',
    enum: ['activo', 'suspendido', 'inactivo'],
    default: 'activo',
  })
  @IsOptional()
  @IsIn(['activo', 'suspendido', 'inactivo'])
  estado?: 'activo' | 'suspendido' | 'inactivo';

  @ApiProperty({
    description: 'Número de teléfono',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 20)
  telefono?: string;
}
