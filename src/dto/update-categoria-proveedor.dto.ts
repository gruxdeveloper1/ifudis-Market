import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaProveedorDto } from './create-categoria-proveedor.dto';

export class UpdateCategoriaProveedorDto extends PartialType(
  CreateCategoriaProveedorDto,
) {}
