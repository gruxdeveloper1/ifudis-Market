import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlcanceEmpresa } from 'src/entities/alcance-empresa.entity';
import { AlcanceEmpresaController } from './alcance-empresa.controller';
import { AlcanceEmpresaService } from './alcance-empresa.service';
@Module({
  imports: [TypeOrmModule.forFeature([AlcanceEmpresa])],
  controllers: [AlcanceEmpresaController],
  providers: [AlcanceEmpresaService],
})
export class AlcanceEmpresaModule {}
