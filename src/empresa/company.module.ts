import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from 'src/entities/company.entity';
import { Address } from 'src/entities/address.entity';
import { ContactPerson } from 'src/entities/contact-person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Address, ContactPerson]), // Asegúrate de registrar todas las entidades relacionadas
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
