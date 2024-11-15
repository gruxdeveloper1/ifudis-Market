// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Asegura que el repositorio esté disponible
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],  // Exporta el servicio si es necesario en otros módulos
})
export class UsersModule {}
