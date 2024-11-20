import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/entities/user.entity';
import { JwtConfigModule } from 'src/jwt/jwt.module'; // Importamos el módulo de configuración de JWT
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtConfigModule, // Usamos el JwtConfigModule
  ],
  providers: [UsersService, EmailService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta UsersService para que pueda ser utilizado en otros módulos
})
export class UsersModule {}
