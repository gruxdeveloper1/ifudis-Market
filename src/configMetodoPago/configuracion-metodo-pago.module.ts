import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionMetodoPago } from 'src/entities/configuracion-metodo-pago';
import { MetodoPagoModule } from 'src/metodosPagos/metodo-pago.module';
import { ConfiguracionMetodoPagoController } from './configuracion-metodo-pago.controller';
import { ConfiguracionMetodoPagoService } from './configuracion-metodo-pago.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfiguracionMetodoPago]), // Importamos la entidad ConfiguracionMetodoPago
    MetodoPagoModule, // Importamos el módulo de MetodoPago para la relación
  ],
  controllers: [ConfiguracionMetodoPagoController], // Controlador que manejará las peticiones
  providers: [ConfiguracionMetodoPagoService], // Servicio que maneja la lógica de negocio
})
export class ConfiguracionMetodoPagoModule {}
