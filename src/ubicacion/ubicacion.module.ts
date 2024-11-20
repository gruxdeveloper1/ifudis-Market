import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corregimiento } from 'src/entities/corregimiento.entity';
import { District } from 'src/entities/district.entity';
import { Province } from 'src/entities/provincia.entity';
import { LocationsController } from './ubicacion.controller';
import { LocationsService } from './ubicacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Corregimiento])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
