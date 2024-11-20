import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'johndoe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  nombre_usuario?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'johndoe@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Tipo de usuario',
    example: 'restaurante',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipo_usuario?: string;

  @ApiProperty({
    description: 'Estado del usuario',
    example: 'activo',
    required: false,
  })
  @IsOptional()
  @IsString()
  estado?: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;
}
