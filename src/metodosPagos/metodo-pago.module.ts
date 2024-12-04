import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPago } from 'src/entities/metodos-pagos';
import { MetodoPagoController } from './metodo-pago.controller';
import { MetodoPagoService } from './metodo-pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPago])], // Importamos la entidad MetodoPago
  controllers: [MetodoPagoController], // Controlador que manejará las peticiones
  providers: [MetodoPagoService], // Servicio que maneja la lógica de negocio
})
export class MetodoPagoModule {}
