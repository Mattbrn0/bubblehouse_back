// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  async getAllUsers() {
    const sql = this.configService.sqlConnection;
    const users = await sql`SELECT * FROM users`;
    return users;
  }

  async getUserInfo() {
    const sql = this.configService.sqlConnection;
    const usersInfo = await sql`SELECT nom, prenom, email FROM users`;
    return usersInfo;
  }
}
