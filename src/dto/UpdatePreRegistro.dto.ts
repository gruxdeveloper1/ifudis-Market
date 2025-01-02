import { PartialType } from '@nestjs/swagger';
import { CreatePreRegistroDto } from './CreatePreRegistroDto';

export class UpdatePreRegistroDto extends PartialType(CreatePreRegistroDto) {}

