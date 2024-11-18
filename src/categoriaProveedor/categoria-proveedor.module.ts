// src/categoria-proveedor/categoria-proveedor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaProveedorService } from './categoria-proveedor.service';
import { CategoriaProveedorController } from './categoria-proveedor.controller';
import { CategoriaProveedor } from 'src/entities/categoria-proveedor.entity';
import { PreRegistro } from 'src/entities/pre-registro.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaProveedor, PreRegistro, Category]),
  ],
  providers: [CategoriaProveedorService],
  controllers: [CategoriaProveedorController],
})
export class CategoriaProveedorModule {}
