import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // Para cifrar las contraseñas
import { CreateUserDto } from 'src/dto/create-user.dto'; // Asegúrate de tener el DTO correcto
import { UpdateUserDto } from 'src/dto/update-user.dto'; // Asegúrate de tener el DTO correcto
import { EmailService } from 'src/email/email.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    // Generar un token único para resetear contraseña
    const token = this.jwtService.sign(
      { email: newUser.email },
      { expiresIn: '1h' }, // Token válido por 1 hora
    );
    newUser.token_reset_password = token;

    // Guardar el usuario sin contraseña
    const user = await this.userRepository.save(newUser);

    // Enviar el correo
    const resetPasswordUrl = `http://your-frontend-url/reset-password?token=${token}`;
    const subject = 'Configura tu contraseña';
    const text = `Hola ${user.nombre_usuario},\n\nPor favor haz clic en el siguiente enlace para configurar tu contraseña:\n\n${resetPasswordUrl}\n\nEste enlace es válido por 1 hora.`;

    await this.emailService.sendConfirmationEmail(user.email, subject, text);

    return user;
  }

  // Método para encontrar un usuario por su email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  // Método para actualizar la contraseña del usuario
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    console.log(newPassword);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Cifrar la nueva contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    user.contraseña = hashedPassword;

    await this.userRepository.save(user);
  }

  // Método para actualizar los datos de un usuario
  async update(
    id_usuario: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Actualizar los datos del usuario
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Método para eliminar un usuario por su ID
  async remove(id_usuario: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id_usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
