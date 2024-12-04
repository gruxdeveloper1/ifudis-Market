import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  id_categoria: number;

  @ApiProperty({ enum: ['stock', 'agotado'], default: 'stock' })
  inventario: 'stock' | 'agotado';

  @ApiProperty({ default: true })
  activo: boolean;

  @ApiProperty()
  precio: number;

  @ApiProperty({
    enum: ['unidad', 'kilogramos', 'gramos'],
    default: 'kilogramos',
  })
  presentacion: 'unidad' | 'kilogramos' | 'gramos';
}
