import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PreRegistroModule } from './preRegistro/pre-registro.module';
import { CategoriaProveedorModule } from './categoriaProveedor/categoria-proveedor.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CategoriesModule } from './categorias/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

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
