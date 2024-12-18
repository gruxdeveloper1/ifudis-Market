import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/entities/category.entity';

export class CreateProductoDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  categoria: Category;

  @ApiProperty({ enum: ['stock', 'agotado'], default: 'stock' })
  inventario: 'stock' | 'agotado';

  @ApiProperty({ default: true })
  activo: boolean;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    enum: [
      'unidad',
      'libra',
      'kilogramos',
      'gramo',
      'litro',
      'Mililitro',
      'Onzas',
    ],
    default: 'unidad',
  })
  presentacion:
    | 'unidad'
    | 'libra'
    | 'kilogramos'
    | 'gramo'
    | 'litro'
    | 'Mililitro'
    | 'Onzas';
}
