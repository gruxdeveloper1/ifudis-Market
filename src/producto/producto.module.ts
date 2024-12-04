import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categorias/categories.module';
import { Producto } from 'src/entities/producto.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), CategoriesModule],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
