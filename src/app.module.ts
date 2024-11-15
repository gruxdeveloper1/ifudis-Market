import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PreRegistro } from './entities/pre-registro.entity';
import { EstatusCorreo } from './entities/estatus-correo.entity';
import { Category } from './entities/category.entity';
import { PreRegistroModule } from './preRegistro/pre-registro.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CategoriesModule } from './categorias/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '1234',
      database: 'ifudisM',
      entities: [PreRegistro, EstatusCorreo, Category],
      autoLoadEntities: true, // Carga las entidades automáticamente
      synchronize: true, // Sincroniza la base de datos con las entidades (desactiva en producción)
    }),
    PreRegistroModule,
    UsersModule,
    CategoriesModule,
  ],
  providers: [
    // Configuración global de validación con ValidationPipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Esta línea habilita la validación global de DTOs
    },

    // Configuración global para el filtro de excepciones personalizado
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Aquí defines el filtro de excepciones
    },
  ],
})
export class AppModule {}
