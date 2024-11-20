import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: this.configService.get<string>('SENDGRID_API_USER'),
        pass: this.configService.get<string>('SENDGRID_API_KEY'),
      },
    });
  }

  async sendConfirmationEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'gruxdeveloper1@gmail.com', // Dirección de correo verificada en SendGrid
      to,
      subject,
      text,
      cc: 'gruxdesign@gmail.com ',
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }
}
