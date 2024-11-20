// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default_secret'), // Si no se encuentra en el .env, se usará 'default_secret'
        signOptions: { expiresIn: '1h' }, // Definir el tiempo de expiración de los tokens
      }),
    }),
  ],
  exports: [JwtModule], // Exportamos JwtModule para que pueda ser utilizado en otros módulos
})
export class JwtConfigModule {}
