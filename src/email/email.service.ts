import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: '', // Tu API key de SendGrid
      },
    });
  }

  async sendConfirmationEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'gruxdeveloper1@gmail.com', // Dirección de correo verificada en SendGrid
      to,
      subject,
      text,
      cc: 'adaempe@gmail.com',
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }
}
