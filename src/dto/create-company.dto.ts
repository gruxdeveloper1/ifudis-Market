import { ApiProperty } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty({
    description: 'ID de la provincia',
    type: Number,
  })
  provinceId: number;

  @ApiProperty({
    description: 'ID de la ciudad',
    type: Number,
  })
  cityId: number;

  @ApiProperty({
    description: 'ID del distrito',
    type: Number,
  })
  districtId: number;

  @ApiProperty({
    description: 'Código postal',
    type: String,
  })
  postalCode: string;

  @ApiProperty({
    description: 'Dirección completa',
    type: String,
  })
  address: string;
}

class ContactPersonDto {
  @ApiProperty({
    description: 'Nombre completo de la persona de contacto',
    type: String,
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico de la persona de contacto',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono de la persona de contacto',
    type: String,
  })
  phone: string;
}

export class BusinessDto {
  @ApiProperty({
    description: 'Logo de la empresa',
    type: String,
  })
  logo: string;

  @ApiProperty({
    description: 'Descripción de la empresa',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Nombre comercial de la empresa',
    type: String,
  })
  businessName: string;

  @ApiProperty({
    description: 'Tipo de contribuyente de la empresa',
    type: String,
  })
  taxpayerType: string;

  @ApiProperty({
    description: 'RUC de la empresa con dígito verificador',
    type: String,
  })
  rucDv: string;

  @ApiProperty({
    description: 'Dirección de la empresa',
    type: AddressDto,
  })
  address: AddressDto;

  @ApiProperty({
    description: 'Persona de contacto de la empresa',
    type: ContactPersonDto,
  })
  contactPerson: ContactPersonDto;
}
