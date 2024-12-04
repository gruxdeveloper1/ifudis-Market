import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlcanceEmpresaModule } from './alcanceEmpresa/alcance-empresa.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaProveedorModule } from './categoriaProveedor/categoria-proveedor.module';
import { CategoriesModule } from './categorias/categories.module';
import { ConfiguracionMetodoPagoModule } from './configMetodoPago/configuracion-metodo-pago.module'; // Importamos ConfiguracionMetodoPagoModule
import { CompanyModule } from './empresa/company.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { MetodoPagoModule } from './metodosPagos/metodo-pago.module'; // Importamos MetodoPagoModule
import { PreRegistroModule } from './preRegistro/pre-registro.module';
import { LocationsModule } from './ubicacion/ubicacion.module';
import { UsersModule } from './users/users.module';
import { ZonaCoberturaModule } from './zonaCobertura/zona-cobertura.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación
      envFilePath: '.env', // Especifica el archivo de variables de entorno
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true, // ¡Ojo! Usar `synchronize: true` solo en desarrollo
        autoLoadEntities: true,
      }),
    }),
    PreRegistroModule,
    UsersModule,
    CategoriesModule,
    AuthModule,
    CategoriaProveedorModule,
    CompanyModule,
    LocationsModule,
    ZonaCoberturaModule,
    AlcanceEmpresaModule,
    MetodoPagoModule,
    ConfiguracionMetodoPagoModule,
  ],
  providers: [
    // Configuración global de validación con ValidationPipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // Configuración global para el filtro de excepciones personalizado
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
