import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordUtil } from 'src/utils/password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Generar una contraseña aleatoria
    const randomPassword = PasswordUtil.generateRandomPassword();
    console.log('Contraseña generada:', randomPassword);

    // Encriptar la contraseña
    const hashedPassword = await PasswordUtil.hashPassword(randomPassword);

    // Guardar el usuario con la contraseña encriptada
    const user = this.userRepository.create({
      ...createUserDto,
      contraseña: hashedPassword,
    });

    return this.userRepository.save(user);
  }
  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id_usuario: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Actualizar un usuario
  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Buscar por email
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
