import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Corregimiento } from 'src/entities/corregimiento.entity';
import { District } from 'src/entities/district.entity';
import { Province } from 'src/entities/provincia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Corregimiento)
    private readonly corregimientoRepository: Repository<Corregimiento>,
  ) {}

  // Provincias
  async createProvince(name: string): Promise<Province> {
    const province = this.provinceRepository.create({ name });
    return await this.provinceRepository.save(province);
  }

  async getProvinces(): Promise<Province[]> {
    return await this.provinceRepository.find({ relations: ['districts'] });
  }

  // Distritos
  async createDistrict(name: string, provinceId: number): Promise<District> {
    const province = await this.provinceRepository.findOneBy({
      id: provinceId,
    });
    if (!province) throw new Error('Provincia no encontrada');

    const district = this.districtRepository.create({ name, province });
    return await this.districtRepository.save(district);
  }

  async getDistricts(provinceId: number): Promise<District[]> {
    return await this.districtRepository.find({
      where: { province: { id: provinceId } },
      relations: ['province', 'corregimientos'],
    });
  }

  // Corregimientos
  async createCorregimiento(
    name: string,
    districtId: number,
  ): Promise<Corregimiento> {
    const district = await this.districtRepository.findOneBy({
      id: districtId,
    });
    if (!district) throw new Error('Distrito no encontrado');

    const corregimiento = this.corregimientoRepository.create({
      name,
      district,
    });
    return await this.corregimientoRepository.save(corregimiento);
  }

  async getCorregimientos(districtId: number): Promise<Corregimiento[]> {
    return await this.corregimientoRepository.find({
      where: { district: { id: districtId } },
      relations: ['district'],
    });
  }
}
