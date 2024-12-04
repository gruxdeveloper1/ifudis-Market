import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessDto } from 'src/dto/create-company.dto';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: BusinessDto): Promise<Company> {
    // Crear una nueva instancia de Company y asignar valores
    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
      address: createCompanyDto.address,
      contactPerson: createCompanyDto.contactPerson,
    });

    // Guardar la entidad con relaciones
    return this.companyRepository.save(newCompany);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Empresa no encontrada');
    }
    return company;
  }
}
