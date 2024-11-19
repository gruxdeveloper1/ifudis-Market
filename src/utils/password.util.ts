import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  // Generar una contraseña aleatoria
  static generateRandomPassword(length: number = 12): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Encriptar la contraseña usando bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // número de rondas para generar el salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  // Comparar una contraseña sin encriptar con una encriptada
  static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
