import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token de recuperación para autenticar la solicitud',
    type: String,
  })
  token: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    type: String,
  })
  newPassword: string;
}
