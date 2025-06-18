import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import postgres from 'postgres';

@Injectable()
export class ConfigService {
  private readonly sql;

  constructor(private configService: NestConfigService) {
    const connectionString = `postgres://${this.configService.get('DB_USERNAME')}:${this.configService.get('DB_PASSWORD')}@${this.configService.get('DB_HOST')}:${this.configService.get('DB_PORT')}/${this.configService.get('DB_DATABASE')}`;

    this.sql = postgres(connectionString, {
      ssl: {
        rejectUnauthorized: false,
      },
      connection: {
        options: `--client_encoding=UTF8`,
      },
      transform: {
        undefined: null,
      },
    });
  }

  get sqlConnection() {
    return this.sql;
  }

  get(key: string): string | undefined {
    return this.configService.get(key);
  }
}
