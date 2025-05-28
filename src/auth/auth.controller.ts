import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('Tentative de connexion reçue');

    if (!loginDto.email || !loginDto.password) {
      console.log('Données de connexion manquantes');
      throw new BadRequestException('Email et mot de passe requis');
    }

    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      console.log('Validation réussie, génération du token');
      return this.authService.login(user);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erreur lors de la connexion');
    }
  }
}
