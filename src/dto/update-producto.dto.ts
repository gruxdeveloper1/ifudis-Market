import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Producto A', required: false })
  @IsOptional() // Hacer que este campo sea opcional
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Este es un producto de ejemplo', required: false })
  @IsOptional() // Hacer que este campo sea opcional
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Precio del producto', example: 100, required: false })
  @IsOptional() // Hacer que este campo sea opcional
  @IsNumber()
  precio?: number;

  @ApiProperty({ description: 'Disponible en stock', example: true, required: false })
  @IsOptional() // Hacer que este campo sea opcional
  @IsBoolean()
  disponible?: boolean;
}
