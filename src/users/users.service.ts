import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  getAllUsers() {
    throw new Error('Method not implemented.');
  }

  async findAll() {
    const result = await this.configService.sqlConnection`
      SELECT * FROM users
    `;
    return result;
  }

  async findByEmail(email: string) {
    const result = await this.configService.sqlConnection`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result[0];
  }

  async findById(id: number) {
    const result = await this.configService.sqlConnection`
      SELECT * FROM users WHERE id_users = ${id}
    `;
    return result[0];
  }
}
