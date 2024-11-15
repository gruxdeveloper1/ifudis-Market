// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    // Verifica si el usuario tiene una contraseña y encríptala
    if (user.contraseña) {
      const saltRounds = 10;
      user.contraseña = await bcrypt.hash(user.contraseña, saltRounds);
    }

    // Crea el nuevo usuario con los datos recibidos
    const newUser = this.userRepository.create(user);

    // Guarda el usuario en la base de datos
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id_usuario: id });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id_usuario: id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async sendNewPassword(email: string): Promise<string> {
    // Buscar al usuario por correo electrónico
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Usuario no encontrado',
        error: 'Not Found',
      });
    }

    // Generar una nueva contraseña aleatoria
    const newPassword = this.generateRandomPassword();

    // Encriptar la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar la contraseña en la base de datos
    user.contraseña = hashedPassword;
    await this.userRepository.save(user);

    // Enviar la nueva contraseña por correo
    await this.sendPasswordByEmail(user.email, newPassword);

    return 'Se ha enviado una nueva contraseña a su correo.';
  }

  // Método para generar una contraseña aleatoria de 8 caracteres
  private generateRandomPassword(): string {
    return crypto.randomBytes(4).toString('hex'); // Genera una cadena de 8 caracteres hexadecimales
  }

  // Método para enviar la contraseña por correo
  private async sendPasswordByEmail(
    email: string,
    password: string,
  ): Promise<void> {
    // Configura el transporte del correo
    const transporter = nodemailer.createTransport({
      service: 'SendGrid', // O el servicio de correo que uses
      auth: {
        user: 'apikey',
        pass: '',
      },
    });

    // Configura el contenido del correo
    const mailOptions = {
      from: 'gruxdeveloper1@gmail.com',
      to: email,
      subject: 'Tu nueva contraseña',
      text: `Tu nueva contraseña es: ${password}`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
  }
}
