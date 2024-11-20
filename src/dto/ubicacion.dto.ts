import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinceDto {
  @ApiProperty({ description: 'Nombre de la provincia', example: 'Panamá' })
  name: string;
}

export class CreateDistrictDto {
  @ApiProperty({ description: 'Nombre del distrito', example: 'San Miguelito' })
  name: string;

  @ApiProperty({ description: 'ID de la provincia asociada', example: 1 })
  provinceId: number;
}

export class CreateCorregimientoDto {
  @ApiProperty({ description: 'Nombre del corregimiento', example: 'Bethania' })
  name: string;

  @ApiProperty({ description: 'ID del distrito asociado', example: 1 })
  districtId: number;
}
