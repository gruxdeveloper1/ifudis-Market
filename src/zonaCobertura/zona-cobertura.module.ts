// modulos/zona-cobertura.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaCoberturaController } from './zona-cobertura.controller';
import { ZonaCoberturaService } from './zona-cobertura.service';
import { ZonaCobertura } from 'src/entities/zona-cobertura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZonaCobertura])],
  controllers: [ZonaCoberturaController],
  providers: [ZonaCoberturaService],
})
export class ZonaCoberturaModule {}
