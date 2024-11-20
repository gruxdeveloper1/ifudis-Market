import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  // Aquí podrías agregar más lógica si es necesario, por ejemplo, para validar roles o permisos

  //ejemplo de uso import { Controller, Get, UseGuards } from '@nestjs/common';
  /*import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
  getProfile() {
    return { message: 'Acceso exitoso a los datos protegidos' };
  }
    "Authorization": "Bearer <tu_token>"
}*/
}
