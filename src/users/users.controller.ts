import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inyecta JwtService
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  /* @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }*/

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') newPassword: string,
  ) {
    let payload;
    try {
      // Verificar el token
      payload = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // Actualizar la contraseña del usuario
    await this.usersService.updatePassword(payload.email, newPassword);
    return { message: 'Contraseña actualizada exitosamente' };
  }
}
