import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      console.log('Tentative de connexion pour:', email);
      const sql = this.configService.sqlConnection;

      const user = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (!user || user.length === 0) {
        console.log('Utilisateur non trouvé');
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      console.log('Utilisateur trouvé, vérification du mot de passe');
      const isPasswordValid = user[0].password === password;
      if (!isPasswordValid) {
        console.log('Mot de passe incorrect');
        throw new UnauthorizedException('mot de passe incorrect');
      }

      console.log('Authentification réussie');
      const result = { ...user[0] };
      delete result.password;
      return result;
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(
        'Erreur lors de la validation des identifiants',
        { cause: error },
      );
    }
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user.id_users };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id_users,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
        },
      };
    } catch (error) {
      console.error('Erreur lors de la génération du token:', error);
      throw new UnauthorizedException('Erreur lors de la génération du token', {
        cause: error,
      });
    }
  }
}
