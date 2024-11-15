import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreRegistro } from '../entities/pre-registro.entity';
import { EstatusCorreo } from '../entities/estatus-correo.entity';
import { PreRegistroService } from './pre-registro.service';
import { PreRegistroController } from './pre-registro.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreRegistro, EstatusCorreo])],
  providers: [PreRegistroService,
    EmailService
  ],
  controllers: [PreRegistroController],
})
export class PreRegistroModule {}
